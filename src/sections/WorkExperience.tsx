import { Box, Typography, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    role: "Frontend Engineer",
    company: "Tech Solutions Inc.",
    period: "2021 – Present",
    description:
      "Building high-performance admin panels and dashboards using React and TypeScript. Collaborated with backend teams to optimize API integrations and improve UX consistency across applications.",
  },
  {
    role: "Full-Stack Developer",
    company: "Startup Labs",
    period: "2019 – 2021",
    description:
      "Developed APIs with FastAPI and integrated Flutter mobile apps with scalable cloud backends. Led deployment pipelines using Docker and CI/CD practices.",
  },
  {
    role: "Intern Developer",
    company: "InnovateX",
    period: "2018 – 2019",
    description:
      "Worked on IoT-based prototypes with Arduino and Raspberry Pi, automating small-scale hardware solutions and dashboards for analytics.",
  },
];

export const WorkExperienceSection = () => {
  return (
    <Box
      id="experience"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #f9fafb 0%, #e3f2fd 100%)",
      }}
    >
      {/* 🔵 Floating Blobs (background) */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <motion.div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(3, 169, 244, 0.25)",
            top: "15%",
            left: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(33, 150, 243, 0.2)",
            bottom: "15%",
            right: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, -25, 0], x: [0, 25, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(97, 218, 251, 0.15)",
            top: "60%",
            left: "40%",
            zIndex: 0,
          }}
          animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </Box>

      {/* 💼 Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            sx={{ color: "#0d47a1" }}
          >
            Work Experience
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            mb={6}
            maxWidth="sm"
            mx="auto"
          >
            My journey of creating software — from hands-on engineering to full-stack architecture.
          </Typography>
        </motion.div>

        {/* 🧭 Timeline */}
        <Box sx={{ position: "relative", ml: { xs: 3, md: 6 }, pl: 2 }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: "absolute",
              left: 10,
              top: 0,
              bottom: 0,
              width: "3px",
              bgcolor: "rgba(13,71,161,0.2)",
            }}
          />

          <Stack spacing={6}>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                style={{ position: "relative" }}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "-13px",
                    top: 6,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#0d47a1",
                    border: "3px solid white",
                    boxShadow: "0 0 0 4px rgba(13,71,161,0.15)",
                  }}
                />

                {/* Experience content */}
                <Box
                  sx={{
                    pl: 5,
                    bgcolor: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 3,
                    p: { xs: 2, md: 3 },
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "#0d47a1" }}
                  >
                    {exp.role}
                  </Typography>
                  <Typography color="text.secondary" mb={1}>
                    {exp.company} • {exp.period}
                  </Typography>
                  <Typography color="text.primary">{exp.description}</Typography>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
