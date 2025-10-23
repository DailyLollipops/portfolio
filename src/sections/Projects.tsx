import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectDetailsDialog } from "../components/ProjectDetailsDialog";
import type { Project } from "../types/Project";

import medbot1 from "../assets/projects/medbot/1.png";
import medbot2 from "../assets/projects/medbot/2.png";
import medbot3 from "../assets/projects/medbot/3.png";
import medbot4 from "../assets/projects/medbot/4.png";
import medbot5 from "../assets/projects/medbot/5.png";
import medbot6 from "../assets/projects/medbot/6.png";
import medbot7 from "../assets/projects/medbot/7.png";
import medbot8 from "../assets/projects/medbot/8.png";
import medbotDescription from "../assets/projects/medbot/description.md?raw";

import blts1 from "../assets/projects/blts/1.png";
import blts2 from "../assets/projects/blts/2.png";
import blts3 from "../assets/projects/blts/3.png";
import blts4 from "../assets/projects/blts/4.png";
import blts5 from "../assets/projects/blts/5.png";
import blts6 from "../assets/projects/blts/6.png";
import bltsDescription from "../assets/projects/blts/description.md?raw";

import municlock1 from "../assets/projects/municlock/1.png";
import municlock2 from "../assets/projects/municlock/2.png";
import municlock3 from "../assets/projects/municlock/3.png";
import municlock4 from "../assets/projects/municlock/4.png";
import municlock5 from "../assets/projects/municlock/5.png";
import municlock6 from "../assets/projects/municlock/6.png";
import municlockDescription from "../assets/projects/municlock/description.md?raw";

import raspidevkit1 from "../assets/projects/raspidevkit/1.png";
import raspidevkitDescription from "../assets/projects/raspidevkit/description.md?raw";


const projects: Project[] = [
  {
    title: "Medbot",
    shortDesription: "An integrated health-monitoring device and web application designed for users to track vital health metrics",
    descriptionMd: medbotDescription,
    tags: ["Python", "RaspberryPi", "Arduino", "Laravel", "MySQL",],
    images: [medbot1, medbot2, medbot3, medbot4, medbot5, medbot6, medbot7, medbot8],
    links: ["https://github.com/DailyLollipops/medbot", "https://github.com/DailyLollipops/medbot-pro"]
  },
  {
    title: "BLTS",
    shortDesription: "A platform for barangay secretaries to digitally track legislative-related documents. Developed for the Province of Marinduque, Philippines.",
    descriptionMd: bltsDescription,
    tags: ["Laravel", "Tailwind", "MySQL", "Laragon"],
    images: [blts1, blts2, blts3, blts4, blts5, blts6],
    links: ["https://github.com/DailyLollipops/BLTS"]
  },
  {
    title: "Municlock",
    shortDesription: "A DTR Management System developed for the LGU of Boac Marinduque",
    descriptionMd: municlockDescription,
    tags: ["Python", "Tkinter", "MySQL"],
    images: [municlock1, municlock2, municlock3, municlock4, municlock5, municlock6],
  },
  {
    title: "RaspiDevKit",
    shortDesription: "A python library for interfacing micro-controller devices to Raspberry PI and Arduino.",
    descriptionMd: raspidevkitDescription,
    tags: ["Python", "Arduino", "RaspberryPi"],
    images: [raspidevkit1],
    links: ["https://github.com/raspidevkit/raspidevkit"]
  },
];

export const ProjectsSection: React.FC = () => {
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
          A showcase of projects demonstrating end-to-end development skills—from
          web and mobile to embedded systems.
        </Typography>
      </Box>

      {/* Project Grid */}
      <Grid container spacing={4} position="relative" zIndex={2}>
        {projects.map((project, index) => (
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
