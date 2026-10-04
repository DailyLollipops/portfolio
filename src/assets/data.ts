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
    role: "Mid Python Developer",
    company: "Elgada BPO Solutions Inc. - Makati City",
    period: "Sep 2023 - Jul 2026",
    description:
      "Designed and implemented scalable web scraping and browser automation solutions for large-scale data extraction using Selenium WebDriver and Playwright. Built high-performance scrapers for dynamic JavaScript-heavy sites, integrated anti-bot evasion (CAPTCHA handling, proxy rotation, fingerprint management, rate-limit mitigation), and engineered robust automation pipelines that improved data acquisition efficiency and scalability.",
    tags: [
      "Python",
      "Selenium",
      "Playwright",
      "MySQL",
      "Redis",
      "Docker",
      "Jenkins",
      "AWS",
    ],
  },
  {
    role: "Computer Programmer (Python)",
    company: "Marinduque Provincial Office - Marinduque",
    period: "Jun 2023 - Aug 2023",
    description:
      "Designed and implemented a biometric time attendance system with Python Tkinter and MySQL to optimize employee attendance tracking. Resolved issues from the earlier system and delivered a robust solution that improved operational efficiency and accuracy under tight time constraints.",
    tags: ["Python", "Tkinter", "MySQL"],
  },
  {
    role: "Intern Developer",
    company: "Marinduque Provincial Office - Marinduque",
    period: "Apr 2023 - Jun 2023",
    description:
      "Built and launched a locally hosted offline website for managing barangay legislative documents (ordinances, code of ordinances, resolutions) with Laravel and Tailwind CSS using Agile methodology. Received positive feedback from barangay secretaries and supervisors for improving organizational efficiency.",
    tags: ["Laravel", "Tailwind", "MySQL"],
  },
];

export const portfolio: PortfolioData = {
  name: "Clarence S. Madrigal",
  login: "DailyLollipops",
  profilePic: profilePic,
  heroTagline:
    "Mid-Level Python Developer with 2+ years of experience building scalable applications, automation systems, and data-driven solutions with Python, FastAPI, React, and Flutter.",
  projectTagline:
    "A showcase of projects demonstrating end-to-end development skills-from web and mobile to embedded systems.",
  location: "Mandaluyong City, Philippines",
  email: "clarencemadrigal08@gmail.com",
  phone: "09183993030",
  blog: "https://github.com/DailyLollipops",
  tags: [
    "Python",
    "FastAPI",
    "MySQL",
    "React",
    "TypeScript",
    "Flutter",
    "Docker",
    "Selenium",
    "Playwright",
    "Redis",
    "AWS",
    "Jenkins",
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
  education: [
    {
      school: "Marinduque State College",
      degree: "BS Computer Engineering",
      period: "2023",
    },
    {
      school: "Marinduque State College",
      degree: "Senior High School - STEM",
      period: "2019",
    },
    {
      school: "Marinduque Midwest College",
      degree: "Junior High School",
      period: "2017",
    },
    {
      school: "Gasan Central School",
      degree: "Elementary",
      period: "2014",
    },
  ],
  certifications: [
    "Google Data Analytics Specialization - Coursera (2023)",
    "DOST Scholarship (R.A. 7687)",
  ],
};
