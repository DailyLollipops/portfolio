import { Box, Typography, Button, Stack, Chip, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { FaReact, FaDocker, FaLaravel } from "react-icons/fa";
import {
  SiTypescript,
  SiPython,
  SiFastapi,
  SiFlutter,
  SiArduino,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiDjango,
  SiRaspberrypi,
} from "react-icons/si";
import profilePic from "../assets/profile.jpg";

export const HeroSection: React.FC = () => {
  const techStack = [
    { name: "React", icon: <FaReact color="#61DAFB" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "Python", icon: <SiPython color="#3776AB" /> },
    { name: "FastAPI", icon: <SiFastapi color="#05998B" /> },
    { name: "Flutter", icon: <SiFlutter color="#02569B" /> },
    { name: "Arduino", icon: <SiArduino color="#3186A0" /> },
  ];

  const floatingIcons = [
    { icon: <SiMysql color="#00618A" size={32} />, top: "15%", left: "20%" },
    { icon: <FaDocker color="#0db7ed" size={36} />, top: "65%", right: "15%" },
    { icon: <SiRedis color="#DC382D" size={34} />, bottom: "10%", left: "25%" },
    { icon: <FaReact color="#61DAFB" size={30} />, top: "30%", right: "30%" },
    { icon: <SiFirebase color="#FFCA28" size={34} />, bottom: "25%", right: "25%" },
    { icon: <FaLaravel color="#FF2D20" size={36} />, top: "45%", left: "15%" },
    { icon: <SiDjango color="#092E20" size={32} />, top: "80%", left: "40%" },
    { icon: <SiRaspberrypi color="#C51A4A" size={34} />, top: "20%", right: "15%" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      id="hero"
      position="relative"
      overflow="hidden"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        background: "linear-gradient(135deg, #f9fafb 0%, #e3f2fd 100%)",
      }}
    >

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        {/* Animated Soft Background Blobs */}
        <motion.div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(97, 218, 251, 0.25)",
            top: "10%",
            left: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(3, 169, 244, 0.2)",
            bottom: "20%",
            right: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, -30, 0], x: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(33, 150, 243, 0.15)",
            top: "60%",
            left: "30%",
            zIndex: 0,
          }}
          animate={{ y: [0, 25, 0], x: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Tech Icons */}
        {floatingIcons.map((blob, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backdropFilter: "blur(5px)",
              ...blob,
              zIndex: 1,
            }}
            animate={{
              y: [0, i % 2 === 0 ? 20 : -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {blob.icon}
          </motion.div>
        ))}
      </Box>

      {/* Content */}
      <Box position="relative" zIndex={2} px={2}>
        <Avatar
          alt="Clarence Madrigal"
          src={profilePic}
          sx={{
            width: 120,
            height: 120,
            mb: 3,
            boxShadow: 3,
            border: "3px solid white",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#0d47a1" }}
          >
            Clarence Madrigal
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="600px"
            sx={{ mb: 3, mx: "auto" }}
          >
            I create scalable and maintainable digital solutions across web, mobile,
            and embedded platforms — built with performance and user experience in mind.
          </Typography>
        </motion.div>

        <Stack
          direction="row"
          gap={2}
          justifyContent="center"
          flexWrap="wrap"
          mb={4}
          sx={{ mt: 2 }}
        >
          {techStack.map((tech) => (
            <Chip
              key={tech.name}
              icon={tech.icon}
              label={tech.name}
              variant="outlined"
              color="primary"
              sx={{
                padding: 1,
                fontWeight: 500,
                bgcolor: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                boxShadow: 1,
              }}
            />
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            href="#projects"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleScroll("projects")}
          >
            View My Work
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="#contact"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleScroll("contact")}
          >
            Contact Me
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
