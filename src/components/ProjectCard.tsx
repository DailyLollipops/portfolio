import {
  Box,
  Typography,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { tags } from "@/components/Tags"
import type { Project } from "@/types/custom";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const maxVisibleTags = isMd ? 2 : 3;

  const visibleTags = project.tags.slice(0, maxVisibleTags);
  const extraTags = project.tags.slice(maxVisibleTags);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
    >
      <Box onClick={onClick} sx={{ cursor: "pointer" }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            height: "100%",
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(8px)",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow:
                "0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            color={theme.palette.primary.main}
            gutterBottom
          >
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 2,
            }}
          >
            {project.shortDesription || project.description}
          </Typography>

          <Box display="flex" flexWrap="nowrap" gap={1} alignItems="center">
            {visibleTags.map((tag) => {
              const iconData = tags[tag];
              return (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  icon={iconData.icon}
                  sx={{
                    padding: 1,
                    color: iconData.color,
                    borderColor: iconData.color,
                    bgcolor: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(4px)",
                    "& .MuiChip-icon": { color: iconData.color },
                  }}
                  variant="outlined"
                  onClick={(e) => e.stopPropagation()}
                />
              );
            })}

            {extraTags.length > 0 && (
              <Chip
                label={`+${extraTags.length} more`}
                size="small"
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  bgcolor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(4px)",
                  zIndex: 100,
                }}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};
