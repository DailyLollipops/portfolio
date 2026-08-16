import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { FiCalendar } from "react-icons/fi";
import { githubStats } from "@/assets/github-stats";

const lastUpdated = new Date(githubStats.updatedAt).toLocaleDateString();

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

const monthOf = (date: string) => {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString("en-US", { month: "short" });
};

export const ContributionCard = ({ dark = true }: { dark?: boolean }) => {
  const days = githubStats.calendar;
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const color = (c: number) => (dark ? heatColor(c) : heatColorLight(c));

  const monthLabels: (string | null)[] = [];
  let prevMonth = "";
  for (const week of weeks) {
    const month = monthOf(week[week.length - 1].date);
    if (month !== prevMonth) {
      monthLabels.push(month);
      prevMonth = month;
    } else {
      monthLabels.push(null);
    }
  }

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
        <Box display="flex" flexDirection="column" alignItems="flex-end" color="text.secondary">
          <Box display="flex" alignItems="center" gap={0.5}>
            <FiCalendar size={14} />
            <Typography variant="caption">Contributions</Typography>
          </Box>
          <Typography variant="caption">Updated {lastUpdated}</Typography>
        </Box>
      </Box>

      <Box sx={{ overflowX: "auto", pb: 1 }}>
        <Box display="flex" sx={{ minWidth: "max-content", width: "max-content" }}>
          <Box display="flex" flexDirection="column" gap={1.5} mr={1}>
            <Box sx={{ height: 14, mb: 1 }} />
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, i) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  height: 11,
                  lineHeight: "11px",
                  fontSize: 10,
                  color: "text.secondary",
                  visibility: i === 1 || i === 3 || i === 5 ? "visible" : "hidden",
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
          <Box>
            <Box display="flex" gap={1.5} mb={1} sx={{ height: 14 }}>
              {monthLabels.map((label, wi) => (
                <Box key={wi} sx={{ width: 11, flexShrink: 0 }}>
                  {label && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 10,
                        lineHeight: 1,
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Box display="flex" gap={1.5}>
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

const LanguageTooltip = ({
  lang,
}: {
  lang: { name: string; pct: number; projects: string[] };
}) => {
  const shown = lang.projects.slice(0, 10);
  const remaining = lang.projects.length - shown.length;
  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontSize: 12, mb: 0.5 }}>
        {lang.name} &mdash; {lang.pct}%
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2, maxHeight: 220, overflow: "auto" }}>
        {shown.map((project) => (
          <Typography key={project} component="li" sx={{ fontSize: 12, lineHeight: 1.5 }}>
            {project}
          </Typography>
        ))}
      </Box>
      {remaining > 0 && (
        <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
          +{remaining} more
        </Typography>
      )}
    </Box>
  );
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Top languages</Typography>
        <Typography variant="caption" color="text.secondary">
          Updated {lastUpdated}
        </Typography>
      </Box>

      <Box
        display="flex"
        height={12}
        overflow="hidden"
        borderRadius={1}
        mb={2}
        sx={{ backgroundColor: "divider" }}
      >
        {languages.map((lang) => (
          <Tooltip key={lang.name} title={<LanguageTooltip lang={lang} />} arrow enterDelay={200}>
            <Box
              sx={{
                width: `${lang.pct}%`,
                backgroundColor: languageColors[lang.name] ?? "#6E7681",
                "&:hover": { filter: "brightness(1.2)" },
              }}
            />
          </Tooltip>
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" gap="4px 16px">
        {languages.map((lang) => (
          <Tooltip key={lang.name} title={<LanguageTooltip lang={lang} />} arrow enterDelay={200}>
            <Box display="flex" alignItems="center" gap={0.75} sx={{ cursor: "pointer" }}>
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
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
};