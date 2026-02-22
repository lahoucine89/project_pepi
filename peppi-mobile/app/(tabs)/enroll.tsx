import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPO, UI } from "../../src/ui";

type Course = {
  code: string;
  title: string;
  credits: number;
  campus: string;
  time: string;
  enrolled: string;
};

export default function Enroll() {
  const [q, setQ] = useState("");

  const courses = useMemo<Course[]>(
    () => [
      {
        code: "IC00AQ92",
        title: "C++ Programming",
        credits: 5,
        campus: "Main",
        time: "Mon–Wed",
        enrolled: "34/100",
      },
      {
        code: "521160P",
        title: "Introduction to AI",
        credits: 5,
        campus: "Main",
        time: "Tue",
        enrolled: "141/0",
      },
      {
        code: "813621S",
        title: "Research Methods",
        credits: 5,
        campus: "Main",
        time: "Tue",
        enrolled: "—",
      },
      {
        code: "811606S",
        title: "Next Gen Software Engineering",
        credits: 5,
        campus: "Main",
        time: "Thu",
        enrolled: "14/0",
      },
      {
        code: "FIN-1",
        title: "Finnish 1",
        credits: 3,
        campus: "Language Center",
        time: "Fri",
        enrolled: "27/30",
      },
    ],
    [],
  );

  const filtered = courses.filter((c) =>
    (c.title + " " + c.code).toLowerCase().includes(q.toLowerCase()),
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
          <Text style={styles.heroTitle}>Enroll</Text>
          <Text style={styles.heroSub}>
            Find and enroll in courses (prototype).
          </Text>

          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search course or code..."
            style={styles.search}
          />
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Available courses</Text>

          <View style={{ marginTop: 10, gap: 10 }}>
            {filtered.map((c) => (
              <View key={c.code} style={styles.courseCard}>
                <View style={UI.rowBetween}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={styles.courseTitle}>{c.title}</Text>
                    <Text style={styles.courseMeta}>
                      {c.code} • {c.credits} ECTS • {c.campus}
                    </Text>
                    <Text style={styles.courseMeta}>Time: {c.time}</Text>
                  </View>
                  <Pressable style={styles.enrollBtn} onPress={() => {}}>
                    <Text style={styles.enrollText}>Enroll</Text>
                  </Pressable>
                </View>
                <Text style={[TYPO.meta, { marginTop: 8 }]}>
                  Enrolled: {c.enrolled}
                </Text>
              </View>
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

  search: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#fff",
    fontWeight: "800",
  },

  courseCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  courseTitle: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
  courseMeta: { marginTop: 4, fontWeight: "800", color: COLORS.sub },

  enrollBtn: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  enrollText: { color: "#fff", fontWeight: "900" },
});
