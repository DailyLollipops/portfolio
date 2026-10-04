import { Box, Paper, Typography, Stack } from "@mui/material";
import { portfolio } from "../assets/data";

export const EducationSection = () => {
  return (
    <Box id="education" pt={4}>
      <Typography variant="h2" mb={1}>
        Education
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        My academic background and professional certifications.
      </Typography>

      <Stack spacing={1.5}>
        {portfolio.education.map((edu) => (
          <Paper
            key={edu.school + edu.period}
            sx={{
              p: 2,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
              flexWrap="wrap"
              gap={1}
            >
              <Typography variant="body1" fontWeight={600}>
                {edu.school}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {edu.period}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {edu.degree}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Typography variant="h6" mt={5} mb={2}>
        Certifications
      </Typography>
      <Stack spacing={1}>
        {portfolio.certifications.map((cert) => (
          <Typography key={cert} variant="body2" color="text.primary">
            • {cert}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};
