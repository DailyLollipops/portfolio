import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { FiCalendar } from "react-icons/fi";
import { githubStats } from "@/assets/github-stats";

const heatColor = (count: number) => {
  if (count === 0) return "#161b22";
  if (count <= 3) return "#0e4429";
  if (count <= 6) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
};

const heatColorLight = (count: number) => {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
};

export const ContributionCard = ({ dark = true }: { dark?: boolean }) => {
  const days = githubStats.calendar;
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const color = (c: number) => (dark ? heatColor(c) : heatColorLight(c));

  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">
          {githubStats.totalContributions.toLocaleString()} contributions in the last year
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
          <FiCalendar size={14} />
          <Typography variant="caption">Contributions</Typography>
        </Box>
      </Box>

      <Box sx={{ overflowX: "auto", pb: 1 }}>
        <Box display="flex" gap={1.5} sx={{ minWidth: "max-content", width: "max-content" }}>
          {weeks.map((week, wi) => (
            <Box key={wi} display="flex" flexDirection="column" gap={1.5}>
              {week.map((day) => (
                <Tooltip
                  key={day.date}
                  title={`${day.count} contributions on ${day.date}`}
                  arrow
                  enterDelay={200}
                >
                  <Box
                    sx={{
                      width: 11,
                      height: 11,
                      borderRadius: 0.5,
                      backgroundColor: color(day.count),
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1} mt={1}>
        <Typography variant="caption" color="text.secondary">
          Less
        </Typography>
        {[0, 1, 4, 7, 10].map((c) => (
          <Box key={c} sx={{ width: 11, height: 11, borderRadius: 0.5, backgroundColor: color(c) }} />
        ))}
        <Typography variant="caption" color="text.secondary">
          More
        </Typography>
      </Box>
    </Paper>
  );
};

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Dart: "#00B4AB",
  CSS: "#563D7C",
  HTML: "#E34C26",
  PHP: "#4F5D95",
  Blade: "#F7523F",
  "C++": "#F34B7D",
  Shell: "#89E051",
};

export const LanguageCard = () => {
  const languages = githubStats.languages;

  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h6" mb={2}>
        Top languages
      </Typography>

      <Box
        display="flex"
        height={12}
        overflow="hidden"
        borderRadius={1}
        mb={2}
        sx={{ backgroundColor: "divider" }}
      >
        {languages.map((lang) => (
          <Box
            key={lang.name}
            sx={{
              width: `${lang.pct}%`,
              backgroundColor: languageColors[lang.name] ?? "#6E7681",
            }}
          />
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" gap="4px 16px">
        {languages.map((lang) => (
          <Box key={lang.name} display="flex" alignItems="center" gap={0.75}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: languageColors[lang.name] ?? "#6E7681",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lang.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lang.pct}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};