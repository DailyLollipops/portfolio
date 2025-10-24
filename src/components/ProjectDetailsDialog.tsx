import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { tags } from "@/components/Tags";
import type { Project } from "@/types/custom";

const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      [direction]: 12,
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(0,0,0,0.1)",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.95)",
      },
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    {direction === "left" ? <FaChevronLeft color="#333" /> : <FaChevronRight color="#333" />}
  </IconButton>
);

interface ProjectDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectDetailsDialog = ({ open, onClose, project }: ProjectDetailsDialogProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isHoveringPopover, setIsHoveringPopover] = useState(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    // toggle on click for touch devices
    if (anchorEl === event.currentTarget) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setTimeout(() => {
      if (!isHoveringPopover) {
        setAnchorEl(null);
      }
    }, 120);
  };

  const openPopover = Boolean(anchorEl);

  if (!project) return null;

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

  const imagesToShow =
    project.images && project.images.length > 0 ? project.images : ["/placeholder-project.png"];

  const markdownComponents: Components = {
    a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
    p: ({ ...props }) => <Typography variant="body1" sx={{ mb: 2 }} {...props} />,
    strong: ({ ...props }) => <Typography component="span" fontWeight={600} {...props} />,
    em: ({ ...props }) => <Typography component="span" fontStyle="italic" {...props} />,
    li: ({ ...props }) => <li style={{ marginLeft: "1.5em", marginBottom: "4px" }} {...props} />,
    code({ children, ...props }) {
      return (
        <Box
          component="pre"
          sx={{
            background: "rgba(0,0,0,0.05)",
            borderRadius: 1,
            p: 2,
            overflowX: "auto",
          }}
          {...props}
        >
          {children}
        </Box>
      );
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {project.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {project.links && project.links.length > 0 ? (
            project.links.map((link, index) => {
              const isGitHub = link.includes("github.com");
              const parts = link.split("/");
              const displayName = isGitHub
                ? parts[parts.length - 1] || link
                : link.replace(/^https?:\/\//, "").replace(/\/$/, "");

              return !isSm ? (
                <Button
                  key={index}
                  href={link}
                  target="_blank"
                  size="small"
                  variant="outlined"
                  startIcon={isGitHub ? <FaGithub /> : <FaExternalLinkAlt />}
                  title={isGitHub ? "View on GitHub" : "View App"}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  {displayName}
                </Button>
              ) : (
                <IconButton
                  key={index}
                  href={link}
                  target="_blank"
                  title={displayName}
                  color="primary"
                  aria-label={displayName}
                >
                  {isGitHub ? <FaGithub /> : <FaExternalLinkAlt />}
                </IconButton>
              );
            })
          ) : (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography display={{ xs: "none", sm: "block" }} variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                Repository Private
              </Typography>
              <IconButton
                size="small"
                onClick={handlePopoverOpen}
              >
                <InfoOutlinedIcon fontSize="small" color="action" />
              </IconButton>

              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                disableRestoreFocus
                slotProps={{
                  paper: {
                    onMouseEnter: () => setIsHoveringPopover(true),
                    onMouseLeave: () => {
                      setIsHoveringPopover(false);
                      handlePopoverClose();
                    },
                    sx: {
                      borderRadius: 2,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(6px)",
                    },
                  }
                }}
              >
                <Box sx={{ p: 2, maxWidth: 260 }}>
                  <Typography variant="body2" color="text.secondary">
                    This project’s repository is private due to client confidentiality,
                    proprietary code, or NDA restrictions.
                  </Typography>
                </Box>
              </Popover>
            </Box>
          )}

          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <DialogContent
          dividers
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              mb: 4,
              position: "relative",
              "& .slick-dots": {
                bottom: -30,
              },
            }}
          >
            <Slider {...sliderSettings}>
              {imagesToShow.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`${project.title} ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: 240, sm: 320, md: 400 },
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </Slider>
          </Box>

          {/* --- Markdown Description --- */}
          <Box sx={{ mb: 3 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {project.descriptionMd ?? ""}
            </ReactMarkdown>
          </Box>

          {/* --- Tags --- */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Tags:
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {project.tags.map((tag) => {
              const iconData = tags[tag];
              return (
                <Chip
                  key={tag}
                  label={tag}
                  icon={iconData.icon}
                  variant="outlined"
                  size="small"
                  sx={{
                    padding: 1,
                    color: iconData.color,
                    borderColor: iconData.color,
                    bgcolor: "rgba(255,255,255,0.6)",
                    "& .MuiChip-icon": { color: iconData.color },
                  }}
                />
              );
            })}
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};
