import type { Experience, PortfolioData } from "@/types/custom";

import profilePic from "@/assets/profile.jpg";
import { project as medbotProject } from "@/assets/projects/medbot";
import { project as bltsProject } from "@/assets/projects/blts";
import { project as municlockProject } from "@/assets/projects/municlock";
import { project as raspidevkitProject } from "@/assets/projects/raspidevkit";

export const experiences: Experience[] = [
  {
    role: "Junior Python Developer",
    company: "Elgada BPO Solutions Inc.",
    period: "Sep 2023 - Present",
    description:
      "Building and maintaining internal tools for scraping automation and data processing using Python. Collaborating with cross-functional teams to deliver efficient software solutions that enhance business operations.",
    tags: [
      "Python",
      "Flask",
      "FastAPI",
      "Redis",
      "MySQL",
      "Docker",
      "Selenium",
      "Playwright",
      "AWS",
      "Jenkins",
    ],
  },
  {
    role: "Programmer",
    company: "Boac Marinduque Local Government Unit",
    period: "Jul 2023 - Aug 2023",
    description:
      "Developed and maintained various local government software solutions, including the Municlock DTR Management System. Focused on enhancing system reliability and user experience through efficient coding practices and regular updates.",
    tags: ["Python", "Tkinter", "MySQL"],
  },
  {
    role: "Intern Developer",
    company: "DILG Marinduque Provincial Office",
    period: "Apr 2023 - Jun 2023",
    description:
      "Worked on Barangay Legislative Tracking System (BLTS) to digitize document tracking for barangay secretaries. Utilized Laravel and Tailwind CSS to create user-friendly interfaces and efficient backend systems.",
    tags: ["Laravel", "Tailwind", "MySQL"],
  },
];

export const portfolio: PortfolioData = {
  name: "Clarence Madrigal",
  profilePic: profilePic,
  heroTagline:
    "I create scalable and maintainable digital solutions across web, mobile, and embedded platforms — built with performance and user experience in mind.",
  projectTagline:
    "A showcase of projects demonstrating end-to-end development skills—from web and mobile to embedded systems.",
  tags: ["Python", "FastAPI", "React", "TypeScript", "Flutter", "Arduino"],
  githubLink: "https://github.com/DailyLollipops",
  linkedInLink: "https://linkedin.com/in/clarence-madrigal-2b8643269",
  projects: [medbotProject, bltsProject, municlockProject, raspidevkitProject],
  experiences: experiences,
};
