import { Box, Paper, Typography, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { portfolio } from "../assets/data";

export const WorkExperienceSection = () => {
  const theme = useTheme();

  return (
    <Box id="experience" pt={4}>
      <Typography variant="h2" mb={1}>
        Work Experience
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        My journey of creating software - from hands-on engineering to
        full-stack architecture.
      </Typography>

      <Stack spacing={2.5}>
        {portfolio.experiences.map((exp, i) => (
          <motion.div
            key={exp.role + exp.period}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Paper
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: theme.palette.primary.main },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                flexWrap="wrap"
                gap={1}
                mb={0.5}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  {exp.role}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                  {exp.period}
                </Typography>
              </Box>

              <Typography variant="body2" fontWeight={500} mb={1.5}>
                {exp.company}
              </Typography>

              <Typography variant="body1" mb={2} color="text.primary">
                {exp.description}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={0.75}>
                {exp.tags.map((tag) => (
                  <Box
                    key={tag}
                    component="span"
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: theme.palette.primary.main,
                      border: "1px solid",
                      borderColor:
                        theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
                      borderRadius: "2em",
                      px: 1.25,
                      py: 0.1,
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.background.paper,
                      },
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};