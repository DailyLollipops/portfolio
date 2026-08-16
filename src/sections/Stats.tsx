import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Grid, Stack, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { githubStats } from "@/assets/github-stats";

const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

const heatColor = (count: number) => {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
};

const ContributionHeatmap = () => {
  const days = githubStats.calendar;
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#ffffff",
        overflowX: "auto",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Contribution activity · {githubStats.totalContributions.toLocaleString()} in the last year
      </Typography>
      <Box display="flex" gap={2} minWidth="max-content">
        {weeks.map((week, wi) => (
          <Box key={wi} display="flex" flexDirection="column" gap={2}>
            {week.map((day) => (
              <Tooltip
                key={day.date}
                title={`${day.date}: ${day.count} contributions`}
                arrow
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 0.5,
                    background: heatColor(day.count),
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" gap={1} mt={2} justifyContent="flex-end">
        <Typography variant="caption" color="text.secondary">
          Less
        </Typography>
        {[0, 1, 4, 7, 10].map((c) => (
          <Box key={c} sx={{ width: 12, height: 12, borderRadius: 0.5, background: heatColor(c) }} />
        ))}
        <Typography variant="caption" color="text.secondary">
          More
        </Typography>
      </Box>
    </Paper>
  );
};

const LanguageBar = ({ name, pct }: { name: string; pct: number }) => {
  const colors: Record<string, string> = {
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
  return (
    <Box mb={1.5}>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pct}%
        </Typography>
      </Box>
      <Box sx={{ height: 8, borderRadius: 4, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, 1)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 4,
            background: colors[name] ?? "#6E7681",
          }}
        />
      </Box>
    </Box>
  );
};

export const StatsSection = () => {
  const stats = githubStats;
  const counters = [
    { label: "Repositories", value: stats.repositories, suffix: "" },
    { label: "Contributions", value: stats.totalContributions, suffix: "+" },
    { label: "Commits", value: stats.totalCommits, suffix: "" },
    { label: "Stars", value: stats.totalStars, suffix: "" },
    { label: "Followers", value: stats.followers, suffix: "" },
  ];

  return (
    <Box
      id="stats"
      py={10}
      px={{ xs: 2, md: 6 }}
      sx={{ background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)" }}
    >
      <Box maxWidth="lg" mx="auto">
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1} mb={1}>
          <FaGithub color="#fff" size={28} />
          <Typography variant="h4" fontWeight={700} color="#fff" textAlign="center">
            GitHub Stats
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={5}>
          A live look at my open-source activity
        </Typography>

        <Grid container spacing={2} mb={4}>
          {counters.map((c) => (
            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={c.label}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  height: "100%",
                }}
              >
                <Typography variant="h4" fontWeight={700} color="#fff">
                  <CountUp value={c.value} suffix={c.suffix} />
                </Typography>
                <Typography variant="body2" color="#8b949e">
                  {c.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                height: "100%",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} color="#fff" mb={2}>
                Top Languages
              </Typography>
              {stats.languages.map((lang) => (
                <LanguageBar key={lang.name} name={lang.name} pct={lang.pct} />
              ))}
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <ContributionHeatmap />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
