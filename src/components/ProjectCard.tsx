import { Box, Paper, Typography, useTheme } from "@mui/material";
import { FiBookmark } from "react-icons/fi";
import { FaStar, FaCodeBranch } from "react-icons/fa";
import type { Project } from "@/types/custom";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const theme = useTheme();
  const hasStats =
    project.stats &&
    (project.stats.stars !== undefined || project.stats.forks !== undefined);

  return (
    <Paper
      onClick={onClick}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        cursor: "pointer",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          backgroundColor:
            theme.palette.mode === "dark" ? "#1c2128" : "#f6f8fa",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5} minWidth={0}>
        <Box display="flex" alignItems="center" gap={1} minWidth={0}>
          <Box
            component="span"
            sx={{ display: "flex", color: theme.palette.text.secondary, flexShrink: 0 }}
          >
            <FiBookmark size={16} />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.title}
          </Typography>
        </Box>
        <Box
          component="span"
          sx={{
            flexShrink: 0,
            ml: 1,
            fontSize: 11,
            color: theme.palette.text.secondary,
            border: "1px solid",
            borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
            borderRadius: "2em",
            px: 0.75,
            py: 0.1,
          }}
        >
          {project.category}
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minHeight: "2.6em",
          mb: 2,
        }}
      >
        {project.shortDesription || project.description}
      </Typography>

      {hasStats && (
        <Box display="flex" alignItems="center" gap={2} mb={1.5}>
          {project.stats?.stars !== undefined && (
            <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
              <FaStar size={13} />
              <Typography variant="caption">{project.stats.stars}</Typography>
            </Box>
          )}
          {project.stats?.forks !== undefined && (
            <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
              <FaCodeBranch size={13} />
              <Typography variant="caption">{project.stats.forks}</Typography>
            </Box>
          )}
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" gap={0.75}>
        {project.tags.slice(0, 4).map((tag) => (
          <Box
            key={tag}
            component="span"
            sx={{
              fontSize: 11,
              fontWeight: 500,
              color: theme.palette.primary.main,
              border: "1px solid",
              borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
              borderRadius: "2em",
              px: 1,
              py: 0.1,
              "&:hover": {
                color: theme.palette.primary.main,
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
  );
};