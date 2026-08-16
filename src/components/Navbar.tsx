import { AppBar, Avatar, Box, ButtonBase, InputBase, Toolbar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useGitHubTheme } from "@/theme/theme-context";
import { portfolio } from "@/assets/data";

const SearchField = styled(InputBase)(({ theme }) => ({
  width: 280,
  maxWidth: "100%",
  minWidth: 0,
  height: 32,
  padding: "0 8px 0 10px",
  borderRadius: 6,
  fontSize: 14,
  color: theme.palette.text.primary,
  backgroundColor:
    theme.palette.mode === "dark" ? "#0d1117" : "#ffffff",
  border: `1px solid ${theme.palette.mode === "dark" ? "#30363d" : "#d0d7de"}`,
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.mode === "dark" ? "rgba(56, 139, 253, 0.4)" : "rgba(9, 105, 218, 0.3)"}`,
  },
  "& input": {
    padding: 0,
  },
}));

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useGitHubTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#010409" : "#f6f8fa",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark" ? "#21262d" : "#d0d7de"
        }`,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 }, gap: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          component={Link}
          to="/"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          <FaGithub size={32} color="#f78166" />
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            fontSize: 16,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          <ButtonBase
            component={Link}
            to="/"
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Portfolio
          </ButtonBase>
        </Box>

        <Box flex={1} />

        <Box display="flex" alignItems="center" gap={1.5} minWidth={0}>
          <SearchField
            placeholder="Search a project…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            startAdornment={
              <Box
                component="span"
                sx={{
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                <FiSearch size={14} />
              </Box>
            }
            endAdornment={
              searchQuery ? (
                <ButtonBase
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  sx={{
                    display: "flex",
                    p: 0.5,
                    borderRadius: 1,
                    color: theme.palette.text.secondary,
                    "&:hover": { color: theme.palette.text.primary },
                  }}
                >
                  <FiX size={14} />
                </ButtonBase>
              ) : undefined
            }
          />

          <ButtonBase
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
            sx={{
              width: 32,
              height: 32,
              borderRadius: 6,
              color: theme.palette.text.secondary,
              border: `1px solid ${
                theme.palette.mode === "dark" ? "#30363d" : "#d0d7de"
              }`,
              "&:hover": {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            {colorMode === "dark" ? (
              <LightModeOutlinedIcon fontSize="small" />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            )}
          </ButtonBase>

          <Avatar
            src={portfolio.profilePic}
            alt={portfolio.name}
            component="a"
            href={portfolio.githubLink}
            target="_blank"
            sx={{
              width: 32,
              height: 32,
              cursor: "pointer",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};