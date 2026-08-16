import { Box, Typography, Link, useTheme } from "@mui/material";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { portfolio } from "@/assets/data";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {portfolio.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Link
            href={portfolio.githubLink}
            target="_blank"
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <FaGithub size={14} />
          </Link>
          <Link
            href={portfolio.linkedInLink}
            target="_blank"
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <FaLinkedin size={14} />
          </Link>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            Built with React, TypeScript & MUI
            <Box
              component="span"
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#f85149" : "#d1242f",
              }}
            >
              <FaHeart size={11} />
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};