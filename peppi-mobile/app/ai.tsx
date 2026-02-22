import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

// backend endpoint (localtunnel)
const API_URL = "https://peppi-ai-server.onrender.com/api/ai-chat";

export default function AIChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content:
        "Hi! I’m your study helper. Ask me anything about courses, schedules, or planning your credits.",
      createdAt: Date.now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const listRef = useRef<FlatList<ChatMessage>>(null);

  const ordered = useMemo(() => {
    return [...messages].sort((a, b) => a.createdAt - b.createdAt);
  }, [messages]);

  function scrollToEnd() {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }

  function addMessage(role: ChatRole, content: string) {
    const msg: ChatMessage = {
      id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role,
      content,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }

  async function send() {
    const text = input.trim();
    if (!text || isSending) return;

    setInput("");
    addMessage("user", text);

    const typingId = `assistant-typing-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        role: "assistant",
        content: "Typing…",
        createdAt: Date.now(),
      },
    ]);

    setIsSending(true);
    scrollToEnd();

    try {
      const lastMessages = [
        ...messages,
        {
          id: "tmp",
          role: "user" as const,
          content: text,
          createdAt: Date.now(),
        },
      ]
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          // ✅ IMPORTANT: correct LocalTunnel bypass header (capitalization matters sometimes)
          "Bypass-Tunnel-Reminder": "true",

          // ✅ Sometimes helps bypass the interstitial
          "User-Agent": "localtunnel",
        },
        body: JSON.stringify({ messages: lastMessages }),
      });

      const raw = await res.text(); // read as text first (important)

      if (!res.ok) {
        throw new Error(`Server error (${res.status}): ${raw.slice(0, 200)}`);
      }

      // If LocalTunnel is still returning HTML, catch it clearly
      if (
        raw.trim().startsWith("<!DOCTYPE") ||
        raw.trim().startsWith("<html")
      ) {
        throw new Error(
          "Tunnel returned an HTML consent/reminder page. Open the tunnel URL in your phone browser and accept it, then try again.",
        );
      }

      let data: { reply?: string } = {};
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(`Response was not JSON: ${raw.slice(0, 200)}`);
      }

      const reply =
        (data?.reply ?? "").trim() || "Sorry, I didn’t get that. Try again.";

      setMessages((prev) =>
        prev.map((m) => (m.id === typingId ? { ...m, content: reply } : m)),
      );
    } catch (err: any) {
      const msg =
        typeof err?.message === "string"
          ? err.message
          : "I couldn’t reach the server. Please check your internet or try again.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                content: msg,
              }
            : m,
        ),
      );
    } finally {
      setIsSending(false);
      scrollToEnd();
    }
  }

  function clearChat() {
    setMessages([
      {
        id: "m-welcome",
        role: "assistant",
        content:
          "Hi! I’m your study helper. Ask me anything about courses, schedules, or planning your credits.",
        createdAt: Date.now(),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>AI Assistant</Text>

        <Pressable onPress={clearChat} style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>Clear</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={ordered}
          keyExtractor={(item: ChatMessage) => item.id}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={scrollToEnd}
          renderItem={({ item }: { item: ChatMessage }) => (
            <ChatBubble role={item.role} text={item.content} />
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask something…"
            placeholderTextColor="#8B8B8B"
            style={styles.input}
            multiline
            maxLength={1500}
            editable={!isSending}
          />

          <Pressable
            onPress={send}
            disabled={isSending || input.trim().length === 0}
            style={({ pressed }) => [
              styles.sendBtn,
              (isSending || input.trim().length === 0) &&
                styles.sendBtnDisabled,
              pressed && !isSending && styles.sendBtnPressed,
            ]}
          >
            {isSending ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.sendBtnText}>Send</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ChatBubble({ role, text }: { role: ChatRole; text: string }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubbleRow, isUser ? styles.rowRight : styles.rowLeft]}>
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        <Text
          style={[styles.bubbleText, isUser ? styles.userText : styles.aiText]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },

  header: {
    height: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
    backgroundColor: "#FFFFFF",
  },
  headerTitle: { fontSize: 16, fontWeight: "700" },
  headerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  headerBtnText: { fontSize: 12, fontWeight: "600" },

  container: { flex: 1 },
  listContent: { padding: 14, paddingBottom: 90 },

  bubbleRow: { width: "100%", marginBottom: 10, flexDirection: "row" },
  rowLeft: { justifyContent: "flex-start" },
  rowRight: { justifyContent: "flex-end" },

  bubble: {
    maxWidth: "84%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  userBubble: { backgroundColor: "#2F6FED" },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  bubbleText: { fontSize: 14, lineHeight: 20 },
  userText: { color: "#FFFFFF", fontWeight: "600" },
  aiText: { color: "#1F2937", fontWeight: "600" },

  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.04)",
    fontSize: 14,
    color: "#111827",
  },
  sendBtn: {
    height: 44,
    minWidth: 74,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F6FED",
    paddingHorizontal: 14,
  },
  sendBtnPressed: { opacity: 0.85 },
  sendBtnDisabled: { opacity: 0.45 },
  sendBtnText: { color: "#FFFFFF", fontWeight: "800" },
});
