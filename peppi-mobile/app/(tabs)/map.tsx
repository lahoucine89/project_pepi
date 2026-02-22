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

export default function CampusMap() {
  const [q, setQ] = useState("");

  const places = useMemo(
    () => [
      { name: "PR105", desc: "Lecture hall • Main building" },
      { name: "TA102", desc: "Computer class • Tech building" },
      { name: "SO301", desc: "Seminar room • Science building" },
      { name: "Language Center", desc: "Finnish courses • Campus center" },
      {
        name: "University Restaurant",
        desc: "Lunch & meals • Student services",
      },
    ],
    [],
  );

  const filtered = places.filter((p) =>
    (p.name + " " + p.desc).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[UI.card, styles.hero]}>
          <Text style={styles.heroTitle}>Campus map</Text>
          <Text style={styles.heroSub}>Find rooms and services quickly.</Text>
        </View>

        <View style={[UI.card, { marginTop: SPACING.m }]}>
          <Text style={TYPO.h3}>Search</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search room, building, restaurant..."
            style={styles.input}
          />

          <Text style={[TYPO.meta, { marginTop: SPACING.m }]}>Results</Text>

          <View style={{ marginTop: 8, gap: 10 }}>
            {filtered.map((p) => (
              <Pressable key={p.name} style={styles.result} onPress={() => {}}>
                <Text style={styles.resultTitle}>{p.name}</Text>
                <Text style={styles.resultSub}>{p.desc}</Text>
                <Text style={styles.resultHint}>
                  Tap to open route (prototype)
                </Text>
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

  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontWeight: "800",
  },

  result: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
  },
  resultTitle: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
  resultSub: { marginTop: 4, fontWeight: "800", color: COLORS.sub },
  resultHint: { marginTop: 8, fontWeight: "900", color: COLORS.primary },
});
