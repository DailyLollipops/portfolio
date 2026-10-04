import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiDownload,
} from "react-icons/fi";
import { portfolio } from "@/assets/data";
import { githubStats } from "@/assets/github-stats";
import { CountUp } from "@/components/CountUp";

const SidebarStats = ({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) => (
  <Box
    flex={1}
    px={1}
    py={1.5}
    textAlign="center"
    sx={{
      "& + &": { borderLeft: "1px solid", borderColor: "divider" },
    }}
  >
    <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
      <CountUp value={value} suffix={suffix} />
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

const Highlight = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) => {
  const theme = useTheme();
  const inner = (
    <Box display="flex" alignItems="center" gap={1.5} minWidth={0}>
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.secondary,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="body2"
        noWrap
        sx={{
          color: href ? theme.palette.primary.main : theme.palette.text.primary,
          fontWeight: href ? 400 : 400,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
  return (
    <Box
      component={href ? "a" : "span"}
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.5,
        color: theme.palette.text.primary,
        "&:hover": href
          ? {
              textDecoration: "none",
              "& p": { textDecoration: "underline" },
            }
          : {},
      }}
    >
      {inner}
    </Box>
  );
};

export const ProfileSidebar = () => {
  const theme = useTheme();

  return (
    <Box>
      <Avatar
        src={portfolio.profilePic}
        alt={portfolio.name}
        sx={{
          width: { xs: 130, md: 260 },
          height: { xs: 130, md: 260 },
          maxWidth: "100%",
          borderRadius: "50%",
          mb: 1.5,
          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(240, 246, 252, 0.1)"
              : "rgba(1, 4, 9, 0.8)",
        }}
      />

      <Typography
        variant="h1"
        sx={{ fontSize: { md: 26, xs: 24 }, fontWeight: 600, mb: 0.25 }}
      >
        {portfolio.name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 20, fontWeight: 300, my: 0, mb: 2 }}
      >
        {portfolio.login}
      </Typography>

      <Typography variant="body1" mb={3} color="text.primary">
        {portfolio.heroTagline}
      </Typography>

      <StackButtons />
      <Stats />

      <Box mt={3} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
        <Highlight icon={<FiMapPin size={16} />} label={portfolio.location} />
        <Highlight
          icon={<FiPhone size={16} />}
          label={portfolio.phone}
          href={`tel:${portfolio.phone.replace(/\s/g, "")}`}
        />
        <Highlight
          icon={<FiMail size={16} />}
          label={portfolio.email}
          href={`mailto:${portfolio.email}`}
        />
        <Highlight
          icon={<FiLinkedin size={16} />}
          label="LinkedIn"
          href={portfolio.linkedInLink}
        />
        <Highlight
          icon={<FiGithub size={16} />}
          label={portfolio.githubLink.replace("https://", "")}
          href={portfolio.githubLink}
        />
      </Box>

      <Box mt={3}>
        <Typography variant="caption" fontWeight={600} color="text.secondary" textTransform="uppercase">
          Skills
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={0.75}>
          {portfolio.tags.map((tag) => (
            <ChipLink key={tag} label={tag} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const StackButtons = () => (
  <Box display="flex" flexDirection="column" gap={1.25} mb={2}>
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{ fontWeight: 500 }}
      href={portfolio.githubLink}
      target="_blank"
    >
      Follow
    </Button>
    <Button
      variant="outlined"
      fullWidth
      href={portfolio.linkedInLink}
      target="_blank"
      startIcon={<FiLinkedin size={14} />}
    >
      Hire Me
    </Button>
    <Button
      variant="outlined"
      fullWidth
      href={portfolio.resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<FiDownload size={14} />}
    >
      View Resume
    </Button>
  </Box>
);

const Stats = () => {
  const stats = [
    { label: "Followers", value: githubStats.followers },
    { label: "Repositories", value: githubStats.repositories },
    { label: "Stars", value: githubStats.totalStars },
  ];
  return (
    <Box
      display="flex"
      border="1px solid"
      borderColor="divider"
      borderRadius={1}
      overflow="hidden"
      bgcolor="background.paper"
    >
      {stats.map((s) => (
        <SidebarStats key={s.label} value={s.value} label={s.label} />
      ))}
    </Box>
  );
};

const ChipLink = ({ label }: { label: string }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        fontSize: 12,
        fontWeight: 500,
        color: theme.palette.text.secondary,
        border: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#30363d" : "#d0d7de",
        borderRadius: "2em",
        px: 1.5,
        py: 0.25,
        "&:hover": {
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {label}
    </Box>
  );
};