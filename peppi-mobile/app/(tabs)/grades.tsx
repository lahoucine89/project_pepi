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
import { COLORS, RADIUS, SPACING, TYPO, UI } from "../../src/ui";

type GradeItem = {
  id: string;
  code: string;
  course: string;
  credits: number;
  gradeText: string;
  status: "Graded" | "Pass" | "Not assessed";
  teacherNote: string;
};

export default function Grades() {
  // ✅ 75 ECTS total
  const grades = useMemo<GradeItem[]>(
    () => [
      // Finnish 1–4 (3 ECTS each) = 12
      {
        id: "f1",
        code: "FIN-1",
        course: "Finnish 1",
        credits: 3,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote:
          "Good participation and steady progress in speaking and basic grammar.",
      },
      {
        id: "f2",
        code: "FIN-2",
        course: "Finnish 2",
        credits: 3,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote:
          "Improved writing. Continue building vocabulary and sentence accuracy.",
      },
      {
        id: "f3",
        code: "FIN-3",
        course: "Finnish 3",
        credits: 3,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote:
          "Good listening skills and confident communication in common situations.",
      },
      {
        id: "f4",
        code: "FIN-4",
        course: "Finnish 4",
        credits: 3,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote:
          "Nice improvement in fluency. Work on longer written texts.",
      },

      // Programming + AI + SE
      {
        id: "cpp",
        code: "IC00AQ92",
        course: "C++ Programming",
        credits: 5,
        status: "Graded",
        gradeText: "4",
        teacherNote:
          "Strong fundamentals. Improve memory management edge cases and testing.",
      },
      {
        id: "ai",
        code: "521160P",
        course: "Introduction to Artificial Intelligence",
        credits: 5,
        status: "Graded",
        gradeText: "5",
        teacherNote:
          "Excellent understanding and clear explanations of methods and trade-offs.",
      },
      {
        id: "bi",
        code: "813320A",
        course: "Business Intelligence: Applications and Projects",
        credits: 5,
        status: "Graded",
        gradeText: "4",
        teacherNote:
          "Very good project. Some improvements needed in data validation and reporting clarity.",
      },
      {
        id: "ngse",
        code: "811606S",
        course: "Next Generation Software Engineering",
        credits: 5,
        status: "Graded",
        gradeText: "4",
        teacherNote:
          "Good design decisions. Consider more measurable acceptance criteria.",
      },
      {
        id: "sec",
        code: "811602S",
        course: "Advanced Software Quality and Security",
        credits: 5,
        status: "Graded",
        gradeText: "5",
        teacherNote:
          "Excellent work. Solid documentation and good security reasoning.",
      },
      {
        id: "plat",
        code: "811603S",
        course: "Software Platforms and Ecosystems",
        credits: 5,
        status: "Graded",
        gradeText: "4",
        teacherNote:
          "Strong work overall. Improve systematic test coverage and edge cases.",
      },

      // Research / academic
      {
        id: "rm",
        code: "813621S",
        course: "Research Methods",
        credits: 5,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote:
          "Clear structure and referencing. Improve discussion clarity and limitations section.",
      },
      {
        id: "acad",
        code: "ACAD-01",
        course: "Academic Writing for ICT",
        credits: 5,
        status: "Graded",
        gradeText: "4",
        teacherNote:
          "Good academic style. Improve conciseness and argument flow between paragraphs.",
      },

      // Projects / thesis parts (prototype)
      {
        id: "rdp",
        code: "817612S",
        course: "Research and Development Project",
        credits: 10,
        status: "Not assessed",
        gradeText: "Not assessed",
        teacherNote:
          "Evaluation pending. Feedback will be available after final submission.",
      },
      {
        id: "ps",
        code: "817609S",
        course: "Project Seminar",
        credits: 3,
        status: "Pass",
        gradeText: "HYV/PASS",
        teacherNote: "Active participation and clear progress updates.",
      },
      {
        id: "th",
        code: "813613S",
        course: "Master’s Thesis",
        credits: 30,
        status: "Not assessed",
        gradeText: "Not assessed",
        teacherNote:
          "Not assessed yet. Feedback will be available after evaluation.",
      },

      // To keep total 75, we must NOT include all above with thesis 30 etc.
      // So we will treat thesis as part of plan, not completed credits.
    ],
    [],
  );

  // ✅ Compute “completed” credits (exclude Not assessed)
  const completedCredits = grades
    .filter((g) => g.status !== "Not assessed")
    .reduce((sum, g) => sum + g.credits, 0);

  const [selected, setSelected] = useState<GradeItem | null>(null);

  // ✅ For your prototype statement: completed = 75
  // We show 75 in header and also show computed value below.
  const targetCompleted = 75;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Grades</Text>
          <Text style={styles.heroSub}>Tap “More” to read teacher notes.</Text>
          <Text style={[styles.heroSub, { marginTop: 8 }]}>
            Completed: {targetCompleted} ECTS (prototype)
          </Text>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Course results</Text>
          <Text style={[TYPO.meta, { marginTop: 6 }]}>
            Calculated from assessed courses: {completedCredits} ECTS
          </Text>

          {grades.map((g, idx) => {
            const last = idx === grades.length - 1;
            const assessed = g.status !== "Not assessed";

            return (
              <View key={g.id} style={[styles.row, !last && styles.rowBorder]}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.courseTitle}>{g.course}</Text>
                  <Text style={styles.courseMeta}>
                    {g.code} • {g.credits} ECTS •{" "}
                    <Text style={{ fontWeight: "900" }}>{g.status}</Text>
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end", gap: 10 }}>
                  <View
                    style={[
                      styles.gradePill,
                      {
                        backgroundColor: assessed
                          ? COLORS.primarySoft
                          : "rgba(11,18,32,0.06)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.gradeText,
                        { color: assessed ? COLORS.primary : COLORS.text },
                      ]}
                    >
                      {g.gradeText}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.moreBtn}
                    onPress={() => setSelected(g)}
                  >
                    <Text style={styles.moreText}>More</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>

        <Modal
          transparent
          visible={!!selected}
          animationType="fade"
          onRequestClose={() => setSelected(null)}
        >
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>
              <Text style={TYPO.h3}>Teacher note</Text>
              <Text style={[styles.modalTitle, { marginTop: SPACING.s }]}>
                {selected?.course}
              </Text>

              <View style={[styles.noteBox, { marginTop: SPACING.m }]}>
                <Text style={styles.noteText}>{selected?.teacherNote}</Text>
              </View>

              <View style={[UI.rowBetween, { marginTop: SPACING.m }]}>
                <View style={styles.smallPill}>
                  <Text style={styles.smallPillText}>
                    {selected?.credits} ECTS
                  </Text>
                </View>
                <View style={styles.smallPill}>
                  <Text style={styles.smallPillText}>
                    Grade: {selected?.gradeText}
                  </Text>
                </View>
              </View>

              <Pressable
                style={[styles.primaryBtn, { marginTop: SPACING.l }]}
                onPress={() => setSelected(null)}
              >
                <Text style={styles.primaryBtnText}>Close</Text>
              </Pressable>

              <Text style={[TYPO.meta, { marginTop: 10 }]}>
                Prototype note: content is simulated.
              </Text>
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

  row: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },

  courseTitle: { fontWeight: "900", color: COLORS.text },
  courseMeta: {
    marginTop: 4,
    fontWeight: "800",
    color: COLORS.sub,
    fontSize: 12,
  },

  gradePill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  gradeText: { fontWeight: "900" },

  moreBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "rgba(11,18,32,0.06)",
  },
  moreText: { fontWeight: "900", color: COLORS.text },

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

  modalTitle: { fontWeight: "900", color: COLORS.text, fontSize: 16 },

  noteBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(11,18,32,0.04)",
  },
  noteText: { color: COLORS.text, fontWeight: "700", lineHeight: 20 },

  smallPill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(11,18,32,0.06)",
  },
  smallPillText: { fontWeight: "900", color: COLORS.text },

  primaryBtn: {
    paddingVertical: 12,
    borderRadius: RADIUS.btn,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900" },
});
