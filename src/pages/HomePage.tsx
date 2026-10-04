import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FiBookmark } from "react-icons/fi";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { SectionTabs } from "@/components/SectionTabs";
import { sectionTabs } from "@/lib/sections";
import type { SectionTabId } from "@/lib/sections";
import { ProjectCard } from "@/components/ProjectCard";
import { ContributionCard, LanguageCard } from "@/sections/Stats";
import { ProjectsPanel } from "@/sections/Projects";
import { WorkExperienceSection } from "@/sections/WorkExperience";
import { EducationSection } from "@/sections/Education";
import { ContactSection } from "@/sections/Contact";
import type { Project } from "@/types/custom";
import { portfolio } from "@/assets/data";

interface HomePageProps {
  searchQuery: string;
  onProjectSelect: (project: Project) => void;
}

export const HomePage = ({ searchQuery, onProjectSelect }: HomePageProps) => {
  const [activeTab, setActiveTab] = useState<SectionTabId>("overview");
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id as SectionTabId);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sectionTabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      setActiveTab(target as SectionTabId);
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const handleTabChange = (value: SectionTabId) => {
    setActiveTab(value);
    const el = document.getElementById(value);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const searchedBefore = useRef(false);
  useEffect(() => {
    if (!searchQuery) {
      searchedBefore.current = false;
      return;
    }
    if (searchedBefore.current) return;
    searchedBefore.current = true;
    setActiveTab("projects");
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchQuery]);

  const pinnedProjects = portfolio.projects.slice(0, 6);

  return (
    <Box
      component="main"
      className="gh-container"
      sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}
    >
      <Grid container spacing={{ xs: 3, md: 5 }}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
            <ProfileSidebar />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8, lg: 9 }} component="section">
          <SectionTabs active={activeTab} onTabClick={handleTabChange} />

          {/* Overview */}
          <Box id="overview">
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
              sx={{ color: theme.palette.text.secondary }}
            >
              <FiBookmark size={16} />
              <Typography variant="h6">Pinned</Typography>
            </Box>

            <Box
              display={{ xs: "block", md: "grid" }}
              gridTemplateColumns="repeat(2, 1fr)"
              gap={2.5}
            >
              {pinnedProjects.map((project) => (
                <Box key={project.title} mb={{ xs: 2, md: 0 }}>
                  <ProjectCard
                    project={project}
                    onClick={() => onProjectSelect(project)}
                  />
                </Box>
              ))}
            </Box>

            <Box mt={4} display="flex" flexDirection="column" gap={3}>
              <ContributionCard dark={theme.palette.mode === "dark"} />
              <LanguageCard />
            </Box>
          </Box>

          <ProjectsPanel query={searchQuery} onProjectSelect={onProjectSelect} />
          <WorkExperienceSection />
          <EducationSection />
          <ContactSection />
        </Grid>
      </Grid>
    </Box>
  );
};