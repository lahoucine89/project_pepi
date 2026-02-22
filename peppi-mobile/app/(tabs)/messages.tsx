import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

type Msg = {
  id: string;
  course: string;
  title: string;
  body: string;
  time: string;
  unread?: boolean;
};

export default function Messages() {
  const messages = useMemo<Msg[]>(
    () => [
      {
        id: "1",
        course: "R&D Project",
        title: "Course starts Tuesday 13.1 at 10:15",
        body: "You can participate either on campus or online via Zoom. Please check the link in Moodle.",
        time: "Today",
        unread: true,
      },
      {
        id: "2",
        course: "C++ Programming",
        title: "Welcome to the course",
        body: "This is a fast pace course. Please be prepared to code from the first day.",
        time: "Yesterday",
      },
      {
        id: "3",
        course: "Research Methods",
        title: "Room change",
        body: "Today's in-class exercise is in a different computer class: TA102.",
        time: "2 days ago",
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 10 }} />

        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Messages</Text>
          <Text style={styles.heroSub}>Course updates and announcements.</Text>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Inbox</Text>

          <View style={{ marginTop: 10, gap: 10 }}>
            {messages.map((m) => (
              <Pressable key={m.id} style={styles.msgCard} onPress={() => {}}>
                <View style={UI.rowBetween}>
                  <Text style={styles.msgCourse}>{m.course}</Text>
                  <Text style={styles.msgTime}>{m.time}</Text>
                </View>

                <Text style={styles.msgTitle}>
                  {m.unread ? "• " : ""}
                  {m.title}
                </Text>

                <Text style={styles.msgBody}>{m.body}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ height: 18 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: SPACING.l, paddingBottom: 28 },

  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: SPACING.l,
  },
  heroTitle: { color: "#fff", fontWeight: "900", fontSize: 22 },
  heroSub: { color: "rgba(255,255,255,0.9)", fontWeight: "800", marginTop: 6 },

  msgCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  msgCourse: { fontWeight: "900", color: COLORS.text },
  msgTime: { fontWeight: "800", color: COLORS.sub },

  msgTitle: {
    marginTop: 8,
    fontWeight: "900",
    color: COLORS.text,
    fontSize: 15,
  },
  msgBody: {
    marginTop: 6,
    fontWeight: "700",
    color: COLORS.sub,
    lineHeight: 20,
  },
});
