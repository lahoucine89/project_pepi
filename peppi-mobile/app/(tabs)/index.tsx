import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS, RADIUS, SPACING, TYPO, UI } from "../../src/ui";

export default function LoginScreen() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onLogin = () => {
    setError("");
    if (!user.trim() || !pass.trim()) {
      setError("Please enter your email/student ID and password.");
      return;
    }
    router.replace("/(tabs)/home" as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={[UI.screen, { paddingTop: SPACING.xl }]}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <View>
            <Text style={TYPO.h1}>Peppi</Text>
            <Text style={TYPO.body}>
              University course enrollment & study plan
            </Text>
          </View>
        </View>

        <View style={[UI.card, { marginTop: SPACING.xl }]}>
          <Text style={TYPO.h3}>Log in</Text>
          <Text style={[TYPO.body, { marginTop: 6 }]}>
            Access your enrollments, progress, and study plan.
          </Text>

          <Text style={[TYPO.meta, { marginTop: SPACING.l }]}>
            Email / Student ID
          </Text>
          <TextInput
            value={user}
            onChangeText={setUser}
            placeholder="lahoucine@student.fi"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={[TYPO.meta, { marginTop: SPACING.m }]}>Password</Text>
          <TextInput
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.primaryBtn} onPress={onLogin}>
            <Text style={styles.primaryBtnText}>Log in</Text>
          </Pressable>

          <View style={[UI.rowBetween, { marginTop: SPACING.m }]}>
            <Pressable
              onPress={() => setError("Password reset is a prototype feature.")}
            >
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
            <Pressable
              onPress={() => setError("Support is a prototype feature.")}
            >
              <Text style={styles.link}>Need help?</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => setError("Language switch is a prototype feature.")}
          >
            <Text style={styles.secondaryBtnText}>Language: EN / FI</Text>
          </Pressable>
        </View>

        <Text
          style={[TYPO.meta, { textAlign: "center", marginTop: SPACING.l }]}
        >
          Prototype for thesis • not connected to real Peppi data
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#fff", fontWeight: "900", fontSize: 22 },

  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.btn,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },

  error: { marginTop: 10, color: COLORS.danger, fontWeight: "800" },

  primaryBtn: {
    marginTop: SPACING.l,
    paddingVertical: 12,
    borderRadius: RADIUS.btn,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900" },

  secondaryBtn: {
    marginTop: SPACING.m,
    paddingVertical: 12,
    borderRadius: RADIUS.btn,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  secondaryBtnText: { color: COLORS.primary, fontWeight: "900" },

  link: { color: COLORS.primary, fontWeight: "900" },
});
