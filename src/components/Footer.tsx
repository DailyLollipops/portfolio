import { Box, Typography, Link, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: "center",
        mt: 6,
        background: theme.palette.primary.dark,
        color: "white",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          opacity: 0.9,
        }}
      >
        © {new Date().getFullYear()} Clarence Madrigal — Built with React & MUI
      </Typography>

      <Box mt={1}>
        <Link
          href="https://github.com/DailyLollipops"
          target="_blank"
          underline="none"
          sx={{
            mx: 1.5,
            color: "white",
            fontWeight: 500,
            transition: "color 0.3s ease",
            "&:hover": { color: theme.palette.secondary.light },
          }}
        >
          GitHub
        </Link>
        <Link
          href="https://linkedin.com/"
          target="_blank"
          underline="none"
          sx={{
            mx: 1.5,
            color: "white",
            fontWeight: 500,
            transition: "color 0.3s ease",
            "&:hover": { color: theme.palette.secondary.light },
          }}
        >
          LinkedIn
        </Link>
      </Box>
    </Box>
  );
};
