import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

export default function Profile() {
  const onChangePassword = () => {
    router.push("/(modal)/change-password" as any);
  };

  const onLogout = () => {
    router.replace("/(tabs)/index" as any);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>

        {/* Header card */}
        <View style={[UI.card, styles.profileCard]}>
          <View style={styles.headerRow}>
            {/* Avatar LEFT */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LA</Text>
            </View>

            {/* Text RIGHT */}
            <View style={styles.headerText}>
              <Text style={styles.name} numberOfLines={1}>
                Lahoucine Alahyane
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                lahoucine@student.fi
              </Text>

              <View style={styles.pills}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>MSc • IPS</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>75</Text>
              <Text style={styles.statLabel}>ECTS</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.stat}>
              <Text style={styles.statNum}>4.25</Text>
              <Text style={styles.statLabel}>GPA</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.stat}>
              <Text style={styles.statNum}>4</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>

        {/* Personal info */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Personal info</Text>
          <Text style={[TYPO.meta, { marginTop: 6 }]}>
            Only name and email are shown in the prototype.
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full name</Text>
            <Text style={styles.infoValue}>Lahoucine Alahyane</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>lahoucine@student.fi</Text>
          </View>

          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Edit info</Text>
          </Pressable>
        </View>

        {/* Gamification */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <View style={UI.rowBetween}>
            <Text style={TYPO.h3}>Gamification</Text>
            <Pressable onPress={() => router.push("/(tabs)/gamification")}>
              <Text style={styles.link}>Open</Text>
            </Pressable>
          </View>

          <Text style={[TYPO.body, { marginTop: 8 }]}>
            Level 3 • 620/1000 XP
          </Text>

          <View style={styles.track}>
            <View style={[styles.fill, { flex: 620 }]} />
            <View style={{ flex: 380 }} />
          </View>
        </View>

        {/* Account */}
        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Account</Text>
          <Text style={[TYPO.meta, { marginTop: 6 }]}>
            Manage your access and security.
          </Text>

          <Pressable style={styles.secondaryBtn} onPress={onChangePassword}>
            <Text style={styles.secondaryBtnText}>Change password</Text>
          </Pressable>

          <Pressable style={styles.dangerBtn} onPress={onLogout}>
            <Text style={styles.dangerBtnText}>Logout</Text>
          </Pressable>
        </View>

        <View style={{ height: 18 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: SPACING.l, paddingBottom: 28 },

  pageHeader: { paddingBottom: 10 },
  pageTitle: { fontSize: 28, fontWeight: "900", color: COLORS.text },

  profileCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: SPACING.l,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 18 },

  headerText: { flex: 1 },

  name: { color: "#fff", fontWeight: "900", fontSize: 20 },
  email: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "800",
    marginTop: 4,
  },

  pills: { marginTop: 10 },
  pill: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  pillText: { color: "#fff", fontWeight: "900" },

  statsRow: { flexDirection: "row", marginTop: 18, alignItems: "center" },
  stat: { flex: 1, alignItems: "center" },
  statNum: { color: "#fff", fontWeight: "900", fontSize: 22 },
  statLabel: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "800",
    marginTop: 4,
  },
  divider: { width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.25)" },

  infoRow: {
    marginTop: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  infoLabel: { fontWeight: "800", color: COLORS.sub, marginBottom: 6 },
  infoValue: { fontWeight: "900", color: COLORS.text },

  primaryBtn: {
    marginTop: SPACING.m,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900" },

  link: { color: COLORS.primary, fontWeight: "900" },

  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(11,18,32,0.10)",
    overflow: "hidden",
    marginTop: 10,
    flexDirection: "row",
  },
  fill: { height: "100%", backgroundColor: COLORS.primary },

  secondaryBtn: {
    marginTop: SPACING.m,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(11,18,32,0.06)",
    alignItems: "center",
  },
  secondaryBtnText: { color: COLORS.text, fontWeight: "900" },

  dangerBtn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(220,38,38,0.12)",
    alignItems: "center",
  },
  dangerBtnText: { color: "#B91C1C", fontWeight: "900" },
});
