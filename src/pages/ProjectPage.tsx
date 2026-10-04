import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { SectionTabs } from "@/components/SectionTabs";
import type { SectionTabId } from "@/lib/sections";
import { RepoContent } from "@/components/RepoContent";
import { findBySlug } from "@/lib/slug";

export const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = findBySlug(slug ?? "");

  const goSection = (id: SectionTabId) => {
    navigate("/", { state: { scrollTo: id } });
  };

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
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            gap={2}
            flexWrap="wrap"
          >
            <Box
              component="button"
              type="button"
              onClick={() => navigate(-1)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                p: 0,
                m: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <FiArrowLeft size={14} />
              <Typography
                component="span"
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Back to profile
              </Typography>
            </Box>
          </Box>

          <SectionTabs active={false} onTabClick={goSection} />

          {!project ? (
            <Box
              sx={{
                p: 6,
                textAlign: "center",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" mb={1}>
                Project not found
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                The project you’re looking for doesn’t exist.
              </Typography>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  Return to profile
                </Typography>
              </Link>
            </Box>
          ) : (
            <RepoContent project={project} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};