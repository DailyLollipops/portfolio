import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { projectSlug } from "./lib/slug";
import type { Project } from "./types/custom";

const AppShell = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const searchedBefore = useRef(false);
  useEffect(() => {
    if (!searchQuery) {
      searchedBefore.current = false;
      return;
    }
    if (searchedBefore.current) return;
    if (location.pathname !== "/") {
      searchedBefore.current = true;
      navigate("/");
      return;
    }
    searchedBefore.current = true;
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchQuery, location.pathname, navigate]);

  const openProject = (project: Project) => {
    navigate(`/projects/${projectSlug(project)}`);
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage searchQuery={searchQuery} onProjectSelect={openProject} />
          }
        />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppShell />
    </>
  );
};

export default App;