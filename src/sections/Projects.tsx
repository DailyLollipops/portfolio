import { useState } from "react";
import { Box, Typography, Paper, Stack, useTheme } from "@mui/material";
import { FiBookmark } from "react-icons/fi";
import { FaStar, FaCodeBranch } from "react-icons/fa";
import { ProjectCard } from "../components/ProjectCard";
import type { Project, ProjectCategory } from "../types/custom";
import { portfolio } from "../assets/data";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "IoT",
  "Desktop",
  "Tools",
];

interface ProjectsPanelProps {
  query?: string;
  onProjectSelect?: (project: Project) => void;
}

export const ProjectsPanel = ({
  query = "",
  onProjectSelect,
}: ProjectsPanelProps) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All"
  );

  const q = query.trim().toLowerCase();
  const filteredProjects = portfolio.projects.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.shortDesription || p.description || "")
        .toLowerCase()
        .includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const select = (project: Project) => onProjectSelect?.(project);

  return (
    <Box id="projects" pt={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h2">Projects</Typography>
        <Typography variant="body2" color="text.secondary">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </Typography>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </Stack>

      {filteredProjects.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No matching projects found.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {/* Grid view (used for larger screens) */}
          <Box
            display={{ xs: "none", md: "grid" }}
            gridTemplateColumns="repeat(2, 1fr)"
            gap={2.5}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onClick={() => select(project)}
              />
            ))}
          </Box>

          {/* List view (mobile) */}
          <Paper
            sx={{
              display: { xs: "block", md: "none" },
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            {filteredProjects.map((project, index) => (
              <RepoRow
                key={project.title}
                project={project}
                divider={index < filteredProjects.length - 1}
                onClick={() => select(project)}
              />
            ))}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const CategoryChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
        px: 1.5,
        py: 0.75,
        borderRadius: 1,
        color: active ? "#ffffff" : theme.palette.text.secondary,
        backgroundColor: active
          ? theme.palette.mode === "dark"
            ? "#1f6feb"
            : "#0969da"
          : "transparent",
        border: "1px solid",
        borderColor: active
          ? "transparent"
          : theme.palette.mode === "dark"
            ? "#30363d"
            : "#d0d7de",
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: active ? undefined : theme.palette.background.paper,
        },
      }}
    >
      {label}
    </Box>
  );
};

const RepoRow = ({
  project,
  divider,
  onClick,
}: {
  project: Project;
  divider: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  const hasStats =
    project.stats &&
    (project.stats.stars !== undefined || project.stats.forks !== undefined);

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 2.5,
        cursor: "pointer",
        borderBottom: divider ? "1px solid" : "none",
        borderColor: "divider",
        transition: "background-color 0.15s ease",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#1c2128" : "#f6f8fa",
        },
      }}
    >
      <Box component="span" sx={{ color: theme.palette.text.secondary, display: "flex" }}>
        <FiBookmark size={16} />
      </Box>
      <Box flex={1} minWidth={0}>
        <Box display="flex" alignItems="center" gap={1.5} minWidth={0}>
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
          <Typography variant="caption" color="text.secondary">
            {project.category}
          </Typography>
          {hasStats && (
            <Box display="flex" alignItems="center" gap={1} ml="auto" color="text.secondary" flexShrink={0}>
              {project.stats?.stars !== undefined && (
                <Box display="flex" alignItems="center" gap={0.4}>
                  <FaStar size={12} />
                  <Typography variant="caption">{project.stats.stars}</Typography>
                </Box>
              )}
              {project.stats?.forks !== undefined && (
                <Box display="flex" alignItems="center" gap={0.4}>
                  <FaCodeBranch size={12} />
                  <Typography variant="caption">{project.stats.forks}</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 1,
          }}
        >
          {project.shortDesription || project.description}
        </Typography>
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
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};