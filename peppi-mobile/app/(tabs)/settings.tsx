import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Settings</Text>
          <Text style={styles.heroSub}>Control your app preferences.</Text>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Preferences</Text>

          <View style={styles.row}>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowTitle}>Dark mode (prototype)</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowTitle}>Usage analytics (prototype)</Text>
            <Switch value={analytics} onValueChange={setAnalytics} />
          </View>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Advanced</Text>

          <Pressable style={styles.actionBtn} onPress={() => {}}>
            <Text style={styles.actionText}>Clear cache (prototype)</Text>
          </Pressable>

          <Pressable style={styles.actionBtn} onPress={() => {}}>
            <Text style={styles.actionText}>Change language (EN / FI)</Text>
          </Pressable>

          <Pressable style={styles.actionBtn} onPress={() => {}}>
            <Text style={styles.actionText}>Privacy & data policy</Text>
          </Pressable>
        </View>

        <Text
          style={[TYPO.meta, { textAlign: "center", marginTop: SPACING.l }]}
        >
          Prototype for thesis • settings are simulated
        </Text>

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

  row: {
    marginTop: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: { fontWeight: "900", color: COLORS.text },

  actionBtn: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(11,18,32,0.06)",
  },
  actionText: { fontWeight: "900", color: COLORS.text },
});
