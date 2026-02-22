import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

export default function Home() {
  const ectsDone = 75;
  const ectsTotal = 120;
  const pct = Math.round((ectsDone / ectsTotal) * 100);

  const xp = 620;
  const xpTotal = 1000;
  const xpPct = Math.round((xp / xpTotal) * 100);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={TYPO.meta}>Welcome back</Text>
            <Text style={TYPO.h1}>Lahoucine</Text>
            <Text style={[TYPO.body, { marginTop: 4 }]}>
              Student Desktop — Mobile Prototype
            </Text>
          </View>

          <Pressable
            style={styles.iconBtn}
            onPress={() => router.push("/(tabs)/messages")}
          >
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </Pressable>
        </View>

        {/* Progress Card */}
        <View style={UI.card}>
          <View style={UI.rowBetween}>
            <Text style={TYPO.h3}>Study Progress</Text>
            <View
              style={[styles.badge, { backgroundColor: COLORS.successSoft }]}
            >
              <Text style={[styles.badgeText, { color: COLORS.success }]}>
                On track
              </Text>
            </View>
          </View>

          <Text style={[TYPO.body, { marginTop: 6 }]}>
            {ectsDone} / {ectsTotal} ECTS • GPA 4.25
          </Text>

          <View style={styles.track}>
            <View style={[styles.fill, { flex: ectsDone }]} />
            <View style={{ flex: Math.max(0, ectsTotal - ectsDone) }} />
          </View>

          <View style={[UI.rowBetween, { marginTop: SPACING.s }]}>
            <Text style={TYPO.meta}>Completed</Text>
            <Text style={TYPO.meta}>{pct}%</Text>
          </View>

          <View style={styles.btnRow}>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => router.push("/(tabs)/studyplan")}
            >
              <Text style={styles.primaryBtnText}>Study plan</Text>
            </Pressable>

            <Pressable
              style={styles.ghostBtn}
              onPress={() => router.push("/(tabs)/enroll")}
            >
              <Text style={styles.ghostBtnText}>Enroll</Text>
            </Pressable>
          </View>
        </View>

        {/* Shortcut Grid (add AI tile) */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Shortcuts</Text>

          <View style={styles.grid}>
            <Pressable
              style={styles.tile}
              onPress={() => router.push("/(tabs)/enroll")}
            >
              <Text style={styles.tileIcon}>➕</Text>
              <Text style={styles.tileTitle}>Enroll</Text>
              <Text style={styles.tileMeta}>Search courses</Text>
            </Pressable>

            <Pressable
              style={styles.tile}
              onPress={() => router.push("/(tabs)/grades")}
            >
              <Text style={styles.tileIcon}>📊</Text>
              <Text style={styles.tileTitle}>Grades</Text>
              <Text style={styles.tileMeta}>Results + notes</Text>
            </Pressable>

            <Pressable
              style={styles.tile}
              onPress={() => router.push("/(tabs)/schedule")}
            >
              <Text style={styles.tileIcon}>🕒</Text>
              <Text style={styles.tileTitle}>Weekly schedule</Text>
              <Text style={styles.tileMeta}>This week</Text>
            </Pressable>

            {/* ✅ NEW: AI Assistant tile */}
            <Pressable style={styles.tile} onPress={() => router.push("/ai")}>
              <Text style={styles.tileIcon}>🤖</Text>
              <Text style={styles.tileTitle}>AI Assistant</Text>
              <Text style={styles.tileMeta}>Ask anything</Text>
            </Pressable>

            <Pressable
              style={styles.tile}
              onPress={() => router.push("/(tabs)/messages")}
            >
              <Text style={styles.tileIcon}>💬</Text>
              <Text style={styles.tileTitle}>Messages</Text>
              <Text style={styles.tileMeta}>Updates</Text>
            </Pressable>
          </View>
        </View>

        {/* Gamification (keep) */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <View style={UI.rowBetween}>
            <Text style={TYPO.h3}>Gamification</Text>
            <Pressable onPress={() => router.push("/(tabs)/gamification")}>
              <Text style={styles.link}>View</Text>
            </Pressable>
          </View>

          <Text style={[TYPO.body, { marginTop: 6 }]}>
            Level 3 • {xp} / {xpTotal} XP
          </Text>

          <View style={styles.track}>
            <View style={[styles.fill, { flex: xp }]} />
            <View style={{ flex: Math.max(0, xpTotal - xp) }} />
          </View>

          <View style={[UI.rowBetween, { marginTop: SPACING.s }]}>
            <Text style={TYPO.meta}>Progress</Text>
            <Text style={TYPO.meta}>{xpPct}%</Text>
          </View>

          <View style={styles.badgeRow}>
            <View
              style={[
                styles.smallBadge,
                { backgroundColor: COLORS.primarySoft },
              ]}
            >
              <Text style={[styles.smallBadgeText, { color: COLORS.primary }]}>
                🏅 30 ECTS
              </Text>
            </View>
            <View
              style={[
                styles.smallBadge,
                { backgroundColor: COLORS.primarySoft },
              ]}
            >
              <Text style={[styles.smallBadgeText, { color: COLORS.primary }]}>
                🎯 5/5 in 5 courses
              </Text>
            </View>
            <View
              style={[
                styles.smallBadge,
                { backgroundColor: COLORS.primarySoft },
              ]}
            >
              <Text style={[styles.smallBadgeText, { color: COLORS.primary }]}>
                ⭐ 4 badges
              </Text>
            </View>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.l,
  },

  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  badgeText: { fontWeight: "900", fontSize: 12 },

  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
    overflow: "hidden",
    marginTop: SPACING.m,
    flexDirection: "row",
  },
  fill: { height: "100%", backgroundColor: COLORS.primary },

  btnRow: { flexDirection: "row", gap: 10, marginTop: SPACING.l },

  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900" },

  ghostBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(11,18,32,0.06)",
    alignItems: "center",
  },
  ghostBtnText: { color: COLORS.text, fontWeight: "900" },

  grid: {
    marginTop: SPACING.m,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  tile: {
    width: "48%",
    padding: SPACING.m,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
  },
  tileIcon: { fontSize: 18, marginBottom: 6 },
  tileTitle: { fontWeight: "900", color: COLORS.text },
  tileMeta: { marginTop: 4, color: COLORS.sub, fontWeight: "700" },

  link: { color: COLORS.primary, fontWeight: "900" },

  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: SPACING.m,
  },
  smallBadge: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999 },
  smallBadgeText: { fontWeight: "900" },
});
