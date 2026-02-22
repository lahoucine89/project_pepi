import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, RADIUS, SPACING, TYPO, UI } from "../../src/ui";

type Status = "completed" | "enrolled" | "planned";
type Course = {
  id: string;
  code: string;
  name: string;
  ects: number;
  status: Status;
};
type Semester = {
  id: string;
  title: string;
  courses: Course[];
};

const DATA: Semester[] = [
  {
    id: "s1",
    title: "Autumn 2025",
    courses: [
      {
        id: "a1",
        code: "813620S",
        name: "Research Methods",
        ects: 5,
        status: "completed",
      },
      {
        id: "a2",
        code: "812671S",
        name: "UX & Usability Evaluation",
        ects: 5,
        status: "completed",
      },
      {
        id: "a3",
        code: "SEM-001",
        name: "Project Seminar",
        ects: 3,
        status: "enrolled",
      },
    ],
  },
  {
    id: "s2",
    title: "Spring 2026",
    courses: [
      {
        id: "b1",
        code: "IC00AQ92",
        name: "C++ Programming",
        ects: 5,
        status: "enrolled",
      },
      {
        id: "b2",
        code: "521160P",
        name: "Introduction to AI",
        ects: 5,
        status: "planned",
      },
      {
        id: "b3",
        code: "FIN-101",
        name: "Survival Finnish",
        ects: 2,
        status: "planned",
      },
    ],
  },
  {
    id: "s3",
    title: "Thesis",
    courses: [
      {
        id: "c1",
        code: "MASTER-TH",
        name: "Master’s Thesis",
        ects: 30,
        status: "planned",
      },
    ],
  },
];

function statusPill(status: Status) {
  if (status === "completed")
    return { bg: COLORS.successSoft, fg: COLORS.success, label: "COMPLETED" };
  if (status === "enrolled")
    return { bg: COLORS.primarySoft, fg: COLORS.primary, label: "ENROLLED" };
  return { bg: "rgba(11,18,32,0.06)", fg: COLORS.text, label: "PLANNED" };
}

export default function StudyPlan() {
  const [openSemester, setOpenSemester] = useState<Record<string, boolean>>({
    s1: true,
    s2: true,
    s3: true,
  });

  const [selected, setSelected] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const totals = useMemo(() => {
    const all = DATA.flatMap((s) => s.courses);
    const completed = all
      .filter((c) => c.status === "completed")
      .reduce((a, c) => a + c.ects, 0);
    const enrolled = all
      .filter((c) => c.status === "enrolled")
      .reduce((a, c) => a + c.ects, 0);
    const planned = all
      .filter((c) => c.status === "planned")
      .reduce((a, c) => a + c.ects, 0);
    return {
      completed,
      enrolled,
      planned,
      total: completed + enrolled + planned,
    };
  }, []);

  const openCourse = (c: Course) => {
    setSelected(c);
    setModalOpen(true);
  };

  const doAction = (action: "complete" | "unenroll" | "remove") => {
    setModalOpen(false);
    if (!selected) return;

    if (action === "complete")
      Alert.alert(
        "Prototype",
        `Marked "${selected.name}" as completed (mock).`,
      );
    if (action === "unenroll")
      Alert.alert("Prototype", `Unenrolled from "${selected.name}" (mock).`);
    if (action === "remove")
      Alert.alert("Prototype", `Removed "${selected.name}" from plan (mock).`);
  };

  const renderSemester = ({ item }: { item: Semester }) => {
    const isOpen = !!openSemester[item.id];
    const semEcts = item.courses.reduce((a, c) => a + c.ects, 0);

    return (
      <View style={[UI.card, { marginTop: SPACING.m }]}>
        <Pressable
          onPress={() =>
            setOpenSemester((p) => ({ ...p, [item.id]: !p[item.id] }))
          }
          style={UI.rowBetween}
        >
          <View>
            <Text style={TYPO.h3}>{item.title}</Text>
            <Text style={TYPO.meta}>{semEcts} ECTS</Text>
          </View>
          <Text style={{ fontSize: 18 }}>{isOpen ? "▾" : "▸"}</Text>
        </Pressable>

        {isOpen ? (
          <>
            <View style={UI.divider} />
            {item.courses.map((c) => {
              const pill = statusPill(c.status);
              return (
                <Pressable
                  key={c.id}
                  style={styles.courseRow}
                  onPress={() => openCourse(c)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.courseTitle}>{c.name}</Text>
                    <Text style={styles.courseMeta}>
                      {c.code} • {c.ects} ECTS
                    </Text>
                  </View>
                  <View style={[styles.pill, { backgroundColor: pill.bg }]}>
                    <Text style={[styles.pillText, { color: pill.fg }]}>
                      {pill.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </>
        ) : null}
      </View>
    );
  };

  return (
    <View style={UI.screen}>
      <View style={UI.rowBetween}>
        <Text style={TYPO.h2}>Study Plan</Text>
        <View style={[styles.badge, { backgroundColor: COLORS.primarySoft }]}>
          <Text style={[styles.badgeText, { color: COLORS.primary }]}>
            {totals.total} ECTS
          </Text>
        </View>
      </View>

      <View style={[UI.card, { marginTop: SPACING.m }]}>
        <Text style={TYPO.h3}>Overview</Text>

        <View style={[UI.rowBetween, { marginTop: SPACING.m }]}>
          <Text style={TYPO.body}>Completed</Text>
          <Text style={styles.value}>{totals.completed} ECTS</Text>
        </View>
        <View style={[UI.rowBetween, { marginTop: SPACING.s }]}>
          <Text style={TYPO.body}>Enrolled</Text>
          <Text style={styles.value}>{totals.enrolled} ECTS</Text>
        </View>
        <View style={[UI.rowBetween, { marginTop: SPACING.s }]}>
          <Text style={TYPO.body}>Planned</Text>
          <Text style={styles.value}>{totals.planned} ECTS</Text>
        </View>

        <Text style={[TYPO.meta, { marginTop: SPACING.m }]}>
          Tap a course for details/actions (prototype).
        </Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(s) => s.id}
        renderItem={renderSemester}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <Modal
        transparent
        visible={modalOpen}
        animationType="fade"
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={TYPO.h3}>{selected?.name ?? ""}</Text>
            <Text style={[TYPO.body, { marginTop: 8 }]}>
              {selected ? `${selected.code} • ${selected.ects} ECTS` : ""}
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.btn, styles.btnGhost]}
                onPress={() => setModalOpen(false)}
              >
                <Text style={[styles.btnText, styles.btnGhostText]}>Close</Text>
              </Pressable>

              {selected?.status === "enrolled" ? (
                <Pressable
                  style={[styles.btn, styles.btnDanger]}
                  onPress={() => doAction("unenroll")}
                >
                  <Text style={styles.btnText}>Unenroll</Text>
                </Pressable>
              ) : null}

              {selected?.status === "planned" ? (
                <Pressable
                  style={[styles.btn, styles.btnDanger]}
                  onPress={() => doAction("remove")}
                >
                  <Text style={styles.btnText}>Remove</Text>
                </Pressable>
              ) : null}

              {selected?.status !== "completed" ? (
                <Pressable
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={() => doAction("complete")}
                >
                  <Text style={styles.btnText}>Mark completed</Text>
                </Pressable>
              ) : null}
            </View>

            <Text style={[TYPO.meta, { marginTop: 10 }]}>
              Prototype actions (no real Peppi connection).
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  badgeText: { fontWeight: "900" },
  value: { fontWeight: "900", color: COLORS.text },

  courseRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  courseTitle: { fontWeight: "900", color: COLORS.text },
  courseMeta: { marginTop: 4, color: COLORS.sub, fontWeight: "700" },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  pillText: { fontWeight: "900", fontSize: 12 },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  modalActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  btn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { fontWeight: "900", color: "#fff" },
  btnPrimary: { backgroundColor: COLORS.primary, flexGrow: 1 },
  btnDanger: { backgroundColor: COLORS.danger, flexGrow: 1 },
  btnGhost: { backgroundColor: "rgba(11,18,32,0.06)" },
  btnGhostText: { color: COLORS.text },
});
