import { HeroSection } from "./sections/Hero";
import { ProjectsSection } from "./sections/Projects";
import { WorkExperienceSection } from "./sections/WorkExperience";
import { ContactSection } from "./sections/Contact";
import { Footer } from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <WorkExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default App;
