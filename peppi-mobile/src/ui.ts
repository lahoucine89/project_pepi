export const COLORS = {
  bg: "#F6F8FC",
  card: "#FFFFFF",
  text: "#0B1220",
  sub: "rgba(11,18,32,0.70)",
  border: "rgba(11,18,32,0.12)",

  primary: "#1F4FB3",
  primarySoft: "rgba(31,79,179,0.14)",

  success: "#1E9E54",
  successSoft: "rgba(30,158,84,0.14)",

  danger: "#B00020",
};

export const SPACING = {
  xs: 6,
  s: 10,
  m: 14,
  l: 18,
  xl: 24,
};

export const RADIUS = {
  card: 18,
  btn: 14,
};

export const TYPO = {
  h1: { fontSize: 30, fontWeight: "900" as const, color: COLORS.text },
  h2: { fontSize: 22, fontWeight: "900" as const, color: COLORS.text },
  h3: { fontSize: 16, fontWeight: "900" as const, color: COLORS.text },
  body: { fontSize: 14, fontWeight: "700" as const, color: COLORS.sub },
  meta: { fontSize: 12, fontWeight: "800" as const, color: COLORS.sub },
};

export const UI = {
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: { flexDirection: "row" as const, alignItems: "center" as const },
  rowBetween: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  screen: { flex: 1, backgroundColor: COLORS.bg },
};
