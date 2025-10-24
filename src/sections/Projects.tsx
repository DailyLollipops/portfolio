import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectDetailsDialog } from "../components/ProjectDetailsDialog";
import type { Project } from "../types/custom";
import { portfolio } from "../assets/data"


export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box
      id="projects"
      position="relative"
      overflow="hidden"
      py={10}
      px={{ xs: 2, md: 6 }}
      sx={{ background: "linear-gradient(135deg, #e3f2fd 0%, #f1f8ff 100%)" }}
    >
      {/* Background Blobs */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <motion.div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(100, 181, 246, 0.25)",
            top: "8%",
            left: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(187, 222, 251, 0.3)",
            bottom: "10%",
            right: "8%",
            zIndex: 0,
          }}
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </Box>

      {/* Section Header */}
      <Box position="relative" zIndex={2} textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight={700} color="#0d47a1" gutterBottom>
          Projects
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth={600}
          mx="auto"
        >
          {portfolio.projectTagline}
        </Typography>
      </Box>

      {/* Project Grid */}
      <Grid container spacing={4} position="relative" zIndex={2}>
        {portfolio.projects.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <ProjectCard
              project={project}
              onClick={() => handleOpen(project)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <ProjectDetailsDialog
        open={open}
        onClose={handleClose}
        project={selectedProject}
      />
    </Box>
  );
};
