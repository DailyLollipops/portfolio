import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { FiFileText, FiImage, FiInfo } from "react-icons/fi";
import Slider from "react-slick";
import { tags } from "@/components/Tags";
import { portfolio } from "@/assets/data";
import type { Project } from "@/types/custom";

const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        [direction]: 8,
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid",
        borderColor: theme.palette.divider,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#1c2128" : "#f6f8fa",
        },
      }}
    >
      {direction === "left" ? (
        <FaChevronLeft color={theme.palette.text.secondary} />
      ) : (
        <FaChevronRight color={theme.palette.text.secondary} />
      )}
    </IconButton>
  );
};

const MetricButton = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
}) => {
  const theme = useTheme();
  return (
    <Box
      display={{ xs: "none", sm: "flex" }}
      alignItems="center"
      height={32}
      sx={{
        border: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
        borderRadius: 1,
        overflow: "hidden",
        fontSize: 13,
        fontWeight: 500,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box px={1.25} display="flex" alignItems="center" gap={0.75} color="text.primary">
        {icon}
        {label}
      </Box>
      {count !== undefined && (
        <Box
          px={1.25}
          py={0.75}
          color="text.secondary"
          sx={{ borderLeft: "1px solid", borderColor: "divider" }}
        >
          {count}
        </Box>
      )}
    </Box>
  );
};

const FileBar = ({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={2}
      py={1}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor:
          theme.palette.mode === "dark" ? "#161b22" : "#f6f8fa",
      }}
    >
      <Box component="span" sx={{ display: "flex", color: theme.palette.text.secondary }}>
        {icon}
      </Box>
      <Typography variant="caption" fontWeight={600} color="text.primary">
        {label}
      </Typography>
      <Box flex={1} />
      {right}
    </Box>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.75,
      px: 2,
      py: 1.25,
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active ? "text.primary" : "text.secondary",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "inherit",
      borderBottom: "2px solid",
      borderColor: active ? "primary.main" : "transparent",
      "&:hover": { color: "text.primary" },
    }}
  >
    {icon}
    {label}
  </Box>
);

const stripLeadingHeading = (md: string) => {
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length && /^#{1,6}\s/.test(lines[i])) i += 1;
  return lines.slice(i).join("\n").trim();
};

export const RepoContent = ({ project }: { project: Project }) => {
  const theme = useTheme();

  const hasStats =
    project.stats &&
    (project.stats.stars !== undefined || project.stats.forks !== undefined);
  const hasLinks = project.links && project.links.length > 0;
  const primaryLink = hasLinks ? project.links![0] : undefined;
  const isGitHubLink = !!primaryLink && primaryLink.includes("github.com");
  const isPublic = isGitHubLink;
  const primaryLanguage = project.tags[0];
  const primaryLanguageColor = primaryLanguage ? tags[primaryLanguage]?.color : undefined;
  const hasScreenshots = !!project.images && project.images.length > 0;
  const hasReadme = !!project.descriptionMd && project.descriptionMd.trim().length > 0;
  const hasMainContent = hasReadme || hasScreenshots;

  const [tab, setTab] = useState<"readme" | "screenshots">(
    hasReadme ? "readme" : "screenshots"
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
  };

  const markdownComponents: Components = {
    a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
    p: ({ children }) => (
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
        {children}
      </Typography>
    ),
    strong: ({ children }) => (
      <Typography component="span" sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    em: ({ children }) => (
      <Typography component="span" sx={{ fontStyle: "italic" }}>
        {children}
      </Typography>
    ),
    li: ({ children }) => (
      <li style={{ marginLeft: "1.5em", marginBottom: "4px" }}>{children}</li>
    ),
    h1: ({ children }) => (
      <Typography variant="h4" sx={{ my: 2 }}>{children as React.ReactNode}</Typography>
    ),
    h2: ({ children }) => (
      <Box
        component="h2"
        sx={{
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.25,
          mt: 3,
          mb: 1.5,
          pb: 0.3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Box>
    ),
    h3: ({ children }) => (
      <Typography variant="h5" sx={{ mt: 2.5, mb: 1 }}>{children as React.ReactNode}</Typography>
    ),
    h4: ({ children }) => (
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{children as React.ReactNode}</Typography>
    ),
    code({ children, className, ...props }) {
      const isBlock = /language-[\w-]+/.test(className || "");
      if (isBlock) {
        return (
          <Box
            component="pre"
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#0d1117" : "#f6f8fa",
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: 1,
              p: 2,
              mb: 2,
              overflowX: "auto",
              fontFamily:
                '"SFMono-Regular", ui-monospace, Menlo, Consolas, monospace',
              fontSize: 13,
            }}
            {...props}
          >
            {children}
          </Box>
        );
      }
      return (
        <Box
          component="code"
          sx={{
            fontFamily: '"SFMono-Regular", ui-monospace, Menlo, Consolas, monospace',
            fontSize: "0.9em",
            px: 0.5,
            py: 0.1,
            borderRadius: 0.5,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(110,118,129,0.4)"
                : "rgba(175,184,193,0.2)",
            color: theme.palette.text.primary,
          }}
          {...props}
        >
          {children}
        </Box>
      );
    },
  };

  return (
    <>
      {/* Repo header */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1.5}
        >
          <Box minWidth={0}>
            <Box display="flex" alignItems="center" gap={1} minWidth={0} flexWrap="wrap">
              <Typography variant="body2" component="span" color="text.secondary" noWrap>
                {portfolio.login}
              </Typography>
              <Typography variant="body2" component="span" color="text.secondary">
                /
              </Typography>
              <Typography
                variant="h6"
                component="span"
                noWrap
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  maxWidth: { xs: 180, sm: 320 },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {project.title}
              </Typography>
              <Box
                component="span"
                sx={{
                  fontSize: 12,
                  color: theme.palette.text.secondary,
                  border: "1px solid",
                  borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
                  borderRadius: "2em",
                  px: 1,
                  py: 0.15,
                }}
              >
                {isPublic ? "Public" : "Private"}
              </Box>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {hasStats && (
              <>
                {project.stats?.stars !== undefined && (
                  <MetricButton
                    icon={<FaStar size={14} />}
                    label="Star"
                    count={project.stats.stars}
                  />
                )}
                {project.stats?.forks !== undefined && (
                  <MetricButton
                    icon={<FaCodeBranch size={14} />}
                    label="Fork"
                    count={project.stats.forks}
                  />
                )}
              </>
            )}

            {primaryLink ? (
              <Button
                href={primaryLink}
                target="_blank"
                size="small"
                variant="contained"
                color="secondary"
                startIcon={isGitHubLink ? <FaGithub /> : <FaExternalLinkAlt />}
                sx={{ minHeight: 32, px: 1.5, fontWeight: 500 }}
              >
                {isGitHubLink ? "Code" : "Live app"}
              </Button>
            ) : (
              <Box
                component="span"
                sx={{
                  fontSize: 12,
                  fontStyle: "italic",
                  color: theme.palette.text.secondary,
                }}
              >
                Repository Private
              </Box>
            )}

            {hasLinks &&
              project.links!.slice(1).map((link, index) => {
                const isGitHub = link.includes("github.com");
                return (
                  <Button
                    key={index}
                    href={link}
                    target="_blank"
                    size="small"
                    variant="outlined"
                    startIcon={isGitHub ? <FaGithub /> : <FaExternalLinkAlt />}
                    title={isGitHub ? "View on GitHub" : "View App"}
                    sx={{ minHeight: 32, px: 1.25 }}
                  >
                    {isGitHub ? "GitHub" : "App"}
                  </Button>
                );
              })}
          </Box>
        </Box>
      </Box>

      {/* Screenshots + About hero */}
      <Grid container spacing={{ xs: 0, md: 3 }} sx={{ mb: 3 }}>
        {hasMainContent && (
          <Grid size={{ xs: 12, md: 8, lg: 8 }}>
            <Box
              sx={{
                mb: { xs: 3, md: 0 },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#161b22" : "#f6f8fa",
                }}
              >
                {hasReadme && (
                  <TabButton
                    active={tab === "readme"}
                    onClick={() => setTab("readme")}
                    icon={<FiFileText size={15} />}
                    label="README.md"
                  />
                )}
                {hasScreenshots && (
                  <TabButton
                    active={tab === "screenshots"}
                    onClick={() => setTab("screenshots")}
                    icon={<FiImage size={15} />}
                    label="Screenshots"
                  />
                )}
                <Box flex={1} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 1.5,
                  }}
                >
                  {tab === "screenshots" && (
                    <Typography variant="caption" color="text.secondary">
                      {project.images.length}{" "}
                      {project.images.length === 1 ? "image" : "images"}
                    </Typography>
                  )}
                </Box>
              </Box>

              {tab === "readme" ? (
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {stripLeadingHeading(project.descriptionMd!)}
                  </ReactMarkdown>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    pb: 6,
                    "& .slick-dots": { bottom: -26 },
                    "& .slick-list": { overflow: "visible" },
                  }}
                >
                  <Slider {...sliderSettings}>
                    {project.images.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`${project.title} ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: { xs: 220, sm: 300, md: 360 },
                          objectFit: "contain",
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                    ))}
                  </Slider>
                </Box>
              )}
            </Box>
          </Grid>
        )}

        <Grid
          size={{
            xs: 12,
            md: hasMainContent ? 4 : 12,
            lg: hasMainContent ? 4 : 12,
          }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
              backgroundColor: "background.paper",
            }}
          >
            <FileBar icon={<FiInfo size={15} />} label="About" />
            <Box px={2.25} py={2.5}>
              <Typography variant="body1" mb={2} color="text.primary">
                {project.shortDesription || project.description}
              </Typography>

              {project.tags.length > 0 && (
                <>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Built with
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.75} mb={2.5}>
                    {project.tags.map((tag) => (
                      <Box
                        key={tag}
                        component="span"
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: theme.palette.primary.main,
                          border: "1px solid",
                          borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
                          borderRadius: "2em",
                          px: 1.25,
                          py: 0.1,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: theme.palette.background.paper,
                          },
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  pt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                }}
              >
                {primaryLanguageColor && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      Language
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.75}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: primaryLanguageColor,
                        }}
                      />
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {primaryLanguage}
                      </Typography>
                    </Box>
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                    {project.category}
                  </Typography>
                </Box>
                {project.stats?.stars !== undefined && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      Stars
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <FaStar size={13} />
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {project.stats.stars}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {project.stats?.forks !== undefined && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      Forks
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <FaCodeBranch size={13} />
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {project.stats.forks}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};