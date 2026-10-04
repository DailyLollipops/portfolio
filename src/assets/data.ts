import type { Experience, PortfolioData } from "@/types/custom";

import profilePic from "@/assets/profile.jpg";
import { project as vclane } from "@/assets/projects/vclane";
import { project as napiergrasspro } from "@/assets/projects/napiergrasspro";
import { project as medbot } from "@/assets/projects/medbot";
import { project as blts } from "@/assets/projects/blts";
import { project as municlock } from "@/assets/projects/municlock";
import { project as smartbin } from "@/assets/projects/smartbin";
import { project as wifiLink } from "@/assets/projects/wifi-link";
import { project as click2dine } from "@/assets/projects/click2dine";
import { project as timekeeper } from "@/assets/projects/timekeeper";
import { project as fastWebAdminTemplate } from "@/assets/projects/fast-web-admin-template";
import { project as dolePulse } from "@/assets/projects/dole-pulse";
import { project as petromaxxAdmin } from "@/assets/projects/petromaxx-admin";
import { project as mswdash } from "@/assets/projects/mswdash";
import { project as raspidevkit } from "@/assets/projects/raspidevkit";

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
  login: "DailyLollipops",
  profilePic: profilePic,
  heroTagline:
    "I create scalable and maintainable digital solutions across web, mobile, and embedded platforms - built with performance and user experience in mind.",
  projectTagline:
    "A showcase of projects demonstrating end-to-end development skills-from web and mobile to embedded systems.",
  location: "Marinduque, Philippines",
  email: "clarencemadrigal08@gmail.com",
  blog: "https://github.com/DailyLollipops",
  tags: [
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "Flutter",
    "C++",
    "Docker",
  ],
  githubLink: "https://github.com/DailyLollipops",
  linkedInLink: "https://linkedin.com/in/clarence-madrigal-2b8643269",
  resumeLink: `${import.meta.env.BASE_URL}resume.pdf`,
  projects: [
    vclane,
    napiergrasspro,
    medbot,
    blts,
    municlock,
    smartbin,
    wifiLink,
    click2dine,
    timekeeper,
    fastWebAdminTemplate,
    dolePulse,
    petromaxxAdmin,
    mswdash,
    raspidevkit,
  ],
  experiences: experiences,
};
