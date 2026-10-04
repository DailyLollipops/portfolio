import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ButtonBase, Fade, useTheme } from "@mui/material";
import { FiArrowUp } from "react-icons/fi";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, navigationType]);

  return null;
};

export const ScrollToTopButton = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={visible}>
      <ButtonBase
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: theme.palette.background.paper,
          border: "1px solid",
          borderColor: "divider",
          color: theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 12px rgba(0, 0, 0, 0.5)"
              : "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 1200,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          },
        }}
      >
        <FiArrowUp size={18} />
      </ButtonBase>
    </Fade>
  );
};