import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

type Badge = { id: string; title: string; desc: string; earned: boolean };

export default function Gamification() {
  const [qrOpen, setQrOpen] = useState(false);

  const badges = useMemo<Badge[]>(
    () => [
      {
        id: "b1",
        title: "First Enrollment",
        desc: "Enrolled in your first course.",
        earned: true,
      },
      { id: "b2", title: "30 ECTS", desc: "Completed 30 ECTS.", earned: true },
      {
        id: "b3",
        title: "5/5 Champion",
        desc: "Got 5/5 in 5 different courses.",
        earned: true,
      },
      {
        id: "b4",
        title: "Planner",
        desc: "Planned a full semester.",
        earned: true,
      },
      {
        id: "b5",
        title: "Consistency",
        desc: "Active weekly progress updates.",
        earned: false,
      },
    ],
    [],
  );

  const xp = 620;
  const xpTotal = 1000;
  const xpPct = Math.round((xp / xpTotal) * 100);

  const eligibleTombola = true; // ✅ because you said “5 of 5 in 5 courses”
  const rewardWon = true; // show “you won one”

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 10 }} />

        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Gamification</Text>
          <Text style={styles.heroSub}>
            Progress, badges, and tombola rewards.
          </Text>

          <View style={{ marginTop: 14 }}>
            <Text style={[TYPO.body, { color: "#fff", fontWeight: "900" }]}>
              Level 3 • {xp}/{xpTotal} XP
            </Text>
            <View style={styles.track}>
              <View style={[styles.fill, { flex: xp }]} />
              <View style={{ flex: Math.max(0, xpTotal - xp) }} />
            </View>
            <Text style={[styles.heroSub, { marginTop: 8 }]}>
              {xpPct}% to next level
            </Text>
          </View>
        </View>

        {/* Tombola */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Tombola reward</Text>
          <Text style={[TYPO.body, { marginTop: 8 }]}>
            Rule: If you get{" "}
            <Text style={{ fontWeight: "900" }}>5/5 in 5 courses</Text>, you
            automatically participate.
          </Text>

          <View style={styles.ruleRow}>
            <View
              style={[
                styles.pill,
                {
                  backgroundColor: eligibleTombola
                    ? COLORS.successSoft
                    : "rgba(11,18,32,0.06)",
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: eligibleTombola ? COLORS.success : COLORS.text },
                ]}
              >
                {eligibleTombola ? "Eligible ✅" : "Not eligible"}
              </Text>
            </View>

            <View
              style={[styles.pill, { backgroundColor: "rgba(11,18,32,0.06)" }]}
            >
              <Text style={[styles.pillText, { color: COLORS.text }]}>
                Prize: 1 month meals
              </Text>
            </View>
          </View>

          {rewardWon && (
            <View style={styles.winBox}>
              <Text style={styles.winTitle}>You won 🎉</Text>
              <Text style={styles.winSub}>
                1 month free meal at the university restaurant.
              </Text>

              <Pressable
                style={styles.primaryBtn}
                onPress={() => setQrOpen(true)}
              >
                <Text style={styles.primaryBtnText}>Click here</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Badges */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Badges</Text>

          <View style={{ marginTop: 10, gap: 10 }}>
            {badges.map((b) => (
              <View key={b.id} style={styles.badgeCard}>
                <View style={UI.rowBetween}>
                  <Text style={styles.badgeTitle}>{b.title}</Text>
                  <Text style={{ fontWeight: "900" }}>
                    {b.earned ? "✅" : "⬜"}
                  </Text>
                </View>
                <Text style={styles.badgeDesc}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* QR Modal */}
        <Modal
          transparent
          visible={qrOpen}
          animationType="fade"
          onRequestClose={() => setQrOpen(false)}
        >
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>
              <Text style={TYPO.h3}>Congrats 🎉</Text>
              <Text style={[TYPO.body, { marginTop: 8 }]}>
                This is your QR code to use at the restaurant.
              </Text>

              <View style={styles.qrFake}>
                <Text style={{ fontWeight: "900", color: COLORS.text }}>
                  QR CODE (prototype)
                </Text>
                <Text
                  style={{ marginTop: 6, color: COLORS.sub, fontWeight: "800" }}
                >
                  PEPPI-MEAL-1MONTH
                </Text>
              </View>

              <Pressable
                style={[styles.primaryBtn, { marginTop: SPACING.m }]}
                onPress={() => setQrOpen(false)}
              >
                <Text style={styles.primaryBtnText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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

  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
    marginTop: 10,
    flexDirection: "row",
  },
  fill: { height: "100%", backgroundColor: "#fff" },

  ruleRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  pill: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999 },
  pillText: { fontWeight: "900" },

  winBox: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  winTitle: { fontWeight: "900", fontSize: 16, color: COLORS.text },
  winSub: { marginTop: 6, color: COLORS.sub, fontWeight: "800" },

  primaryBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900" },

  badgeCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  badgeTitle: { fontWeight: "900", color: COLORS.text },
  badgeDesc: { marginTop: 6, fontWeight: "800", color: COLORS.sub },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },

  qrFake: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    backgroundColor: "rgba(11,18,32,0.04)",
  },
});
