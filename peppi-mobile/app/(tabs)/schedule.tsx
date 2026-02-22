import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

type Session = {
  day: string;
  time: string;
  course: string;
  place: string;
  type: string;
};

export default function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
  const [activeDay, setActiveDay] = useState<(typeof days)[number]>("Mon");

  const sessions = useMemo<Session[]>(
    () => [
      {
        day: "Mon",
        time: "10:15–12:00",
        course: "Research Methods",
        place: "PR105",
        type: "Lecture",
      },
      {
        day: "Mon",
        time: "13:15–15:00",
        course: "C++ Programming",
        place: "TA102",
        type: "Lab",
      },

      {
        day: "Tue",
        time: "09:15–11:00",
        course: "Introduction to AI",
        place: "Zoom",
        type: "Lecture",
      },
      {
        day: "Tue",
        time: "12:15–14:00",
        course: "UX & Usability Evaluation",
        place: "SO301",
        type: "Seminar",
      },

      {
        day: "Wed",
        time: "10:15–12:00",
        course: "Business Intelligence",
        place: "TE204",
        type: "Lecture",
      },
      {
        day: "Wed",
        time: "13:15–15:00",
        course: "Survival Finnish",
        place: "Language Center",
        type: "Practice",
      },

      {
        day: "Thu",
        time: "10:15–12:00",
        course: "Next Gen Software Engineering",
        place: "IT101",
        type: "Lecture",
      },
      {
        day: "Thu",
        time: "13:15–15:00",
        course: "Project Seminar",
        place: "PR205",
        type: "Seminar",
      },

      {
        day: "Fri",
        time: "09:15–11:00",
        course: "Advanced Software Quality",
        place: "SO201",
        type: "Lecture",
      },
      {
        day: "Fri",
        time: "12:15–13:45",
        course: "Finnish 1",
        place: "Language Center",
        type: "Practice",
      },
    ],
    [],
  );

  const todaySessions = sessions.filter((s) => s.day === activeDay);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Weekly schedule</Text>
          <Text style={styles.heroSub}>Your courses for this week.</Text>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Days</Text>
          <View style={styles.dayRow}>
            {days.map((d) => {
              const active = d === activeDay;
              return (
                <Pressable
                  key={d}
                  onPress={() => setActiveDay(d)}
                  style={[
                    styles.dayPill,
                    {
                      backgroundColor: active
                        ? COLORS.primary
                        : "rgba(11,18,32,0.06)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: active ? "#fff" : COLORS.text },
                    ]}
                  >
                    {d}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={[TYPO.meta, { marginTop: SPACING.m }]}>Sessions</Text>

          {todaySessions.length === 0 ? (
            <Text style={[TYPO.body, { marginTop: 8 }]}>No sessions.</Text>
          ) : (
            <View style={{ marginTop: 8, gap: 10 }}>
              {todaySessions.map((s, i) => (
                <View key={i} style={styles.sessionCard}>
                  <View style={styles.sessionTop}>
                    <Text style={styles.sessionTime}>{s.time}</Text>
                    <View style={styles.typePill}>
                      <Text style={styles.typeText}>{s.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.sessionCourse}>{s.course}</Text>
                  <Text style={styles.sessionPlace}>{s.place}</Text>
                </View>
              ))}
            </View>
          )}
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

  dayRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  dayPill: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999 },
  dayText: { fontWeight: "900" },

  sessionCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  sessionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sessionTime: { fontWeight: "900", color: COLORS.text },
  typePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
  },
  typeText: { fontWeight: "900", color: COLORS.primary },

  sessionCourse: {
    marginTop: 8,
    fontWeight: "900",
    fontSize: 16,
    color: COLORS.text,
  },
  sessionPlace: { marginTop: 4, fontWeight: "800", color: COLORS.sub },
});
