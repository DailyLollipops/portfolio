import { createTheme, type Theme } from "@mui/material/styles";

export type ColorMode = "dark" | "light";

export const fontStack = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Noto Sans"',
  "Helvetica",
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
].join(", ");

export const monoStack =
  "SFMono-Regular, ui-monospace, SFMono-Regular, 'Segoe UI Mono', 'Roboto Mono', Menlo, Consolas, monospace";

interface GhTokens {
  bgDefault: string;
  bgSubtle: string;
  bgInset: string;
  borderMuted: string;
  borderStrong: string;
  fgDefault: string;
  fgMuted: string;
  fgSubtle: string;
  fgOnEmphasis: string;
  accentFg: string;
  accentEmphasis: string;
  successFg: string;
  successEmphasis: string;
  dangerFg: string;
  focusRing: string;
  headerBg: string;
}

const tokens: Record<ColorMode, GhTokens> = {
  dark: {
    bgDefault: "#0d1117",
    headerBg: "#010409",
    bgSubtle: "#161b22",
    bgInset: "#010409",
    borderMuted: "#21262d",
    borderStrong: "#8b949e",
    fgDefault: "#e6edf3",
    fgMuted: "#8b949e",
    fgSubtle: "#7d8590",
    fgOnEmphasis: "#ffffff",
    accentFg: "#58a6ff",
    accentEmphasis: "#1f6feb",
    successFg: "#3fb950",
    successEmphasis: "#238636",
    dangerFg: "#f85149",
    focusRing: "rgba(56, 139, 253, 0.4)",
  },
  light: {
    bgDefault: "#ffffff",
    bgSubtle: "#f6f8fa",
    bgInset: "#ffffff",
    borderMuted: "#d0d7de",
    borderStrong: "#394b58",
    fgDefault: "#1f2328",
    fgMuted: "#59636e",
    fgSubtle: "#656d76",
    fgOnEmphasis: "#ffffff",
    accentFg: "#0969da",
    accentEmphasis: "#0969da",
    successFg: "#1a7f37",
    successEmphasis: "#1f883d",
    dangerFg: "#d1242f",
    focusRing: "rgba(9, 105, 218, 0.3)",
    headerBg: "#f6f8fa",
  },
};

export const createGhTheme = (mode: ColorMode): Theme => {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: t.accentFg },
      secondary: { main: t.successEmphasis },
      success: { main: t.successEmphasis },
      background: {
        default: t.bgDefault,
        paper: mode === "dark" ? t.bgSubtle : "#ffffff",
      },
      text: {
        primary: t.fgDefault,
        secondary: t.fgMuted,
      },
      divider: t.borderMuted,
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: fontStack,
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: { fontSize: 26, fontWeight: 600, lineHeight: 1.2 },
      h2: { fontSize: 24, fontWeight: 600, lineHeight: 1.25 },
      h3: { fontSize: 20, fontWeight: 600, lineHeight: 1.3 },
      h4: { fontSize: 18, fontWeight: 600, lineHeight: 1.3 },
      h5: { fontSize: 16, fontWeight: 600, lineHeight: 1.4 },
      h6: { fontSize: 15, fontWeight: 600, lineHeight: 1.5 },
      body1: { fontSize: 14, lineHeight: 1.5 },
      body2: { fontSize: 14, lineHeight: 1.5 },
      subtitle1: { fontSize: 16 },
      subtitle2: { fontSize: 14 },
      caption: { fontSize: 12 },
      overline: { fontSize: 12 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: 14,
            minHeight: 32,
            borderRadius: 6,
          },
          containedPrimary: {
            backgroundColor: t.accentEmphasis,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#388bfd" : "#0969da",
            },
            "&:disabled": {
              backgroundColor: t.bgSubtle,
              color: t.fgSubtle,
            },
          },
          containedSecondary: {
            backgroundColor: t.successEmphasis,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#2ea043" : "#1a7f37",
            },
          },
          outlined: {
            borderColor: mode === "dark" ? "#30363d" : "#d1d9e0",
            color: t.fgDefault,
            "&:hover": {
              borderColor: t.borderStrong,
              backgroundColor: t.bgSubtle,
              color: t.fgDefault,
            },
          },
          text: {
            color: t.accentFg,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: t.accentFg,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: t.bgInset,
            borderRadius: 6,
            fontSize: 14,
            color: t.fgDefault,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: mode === "dark" ? "#30363d" : "#d1d9e0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: t.borderStrong,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: t.accentFg,
              borderWidth: 1,
              boxShadow: `0 0 0 3px ${t.focusRing}`,
            },
          },
          input: {
            padding: "5px 12px",
            lineHeight: "20px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: 14,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: t.fgMuted,
            fontSize: 14,
            "&.Mui-focused": { color: t.fgMuted },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { padding: "6px 12px" },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            fontSize: 12,
            height: 24,
            backgroundColor: "transparent",
            "&.MuiChip-outlined": {
              borderColor: mode === "dark" ? "#30363d" : "#d1d9e0",
              color: t.fgDefault,
              "&:hover": {
                backgroundColor: t.bgSubtle,
                borderColor: t.accentFg,
              },
            },
            "&.MuiChip-filled": {
              backgroundColor: mode === "dark" ? "#21262d" : "#eaeef2",
              color: t.fgDefault,
              "&:hover": {
                backgroundColor: mode === "dark" ? "#30363d" : "#d1d9e0",
              },
            },
            "&.MuiChip-filled.MuiChip-colorPrimary": {
              backgroundColor: t.accentEmphasis,
              color: "#ffffff",
              "&:hover": { backgroundColor: t.accentEmphasis },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: t.bgDefault,
            border: `1px solid ${mode === "dark" ? "#30363d" : "#d1d9e0"}`,
            borderRadius: 6,
            backgroundImage: "none",
            boxShadow:
              "0 24px 80px rgba(1, 4, 9, 0.6), 0 0 0 1px rgba(1, 4, 9, 0.1)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === "dark" ? "#010409" : "#1f2328",
            color: "#ffffff",
            fontSize: 12,
            border: `1px solid ${mode === "dark" ? "#30363d" : "#394b58"}`,
            borderRadius: 6,
            padding: "4px 8px",
          },
          arrow: { color: mode === "dark" ? "#010409" : "#1f2328" },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 48 },
          indicator: { height: 2, backgroundColor: "#f78166" },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: 14,
            color: t.fgMuted,
            minHeight: 48,
            minWidth: 0,
            padding: "6px 10px",
            "&.Mui-selected": { color: t.fgDefault },
            "&:hover": { color: t.fgDefault },
          },
        },
      },
    },
  });
};

export const darkTheme = createGhTheme("dark");
export const lightTheme = createGhTheme("light");