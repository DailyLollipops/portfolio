import {
  FaReact,
  FaPython,
  FaDocker,
  FaJs,
  FaLaravel,
  FaWindowMaximize,
} from "react-icons/fa";
import {
  SiFlutter,
  SiFastapi,
  SiDjango,
  SiArduino,
  SiRaspberrypi,
  SiMysql,
  SiRedis,
  SiTypescript,
  SiMui,
  SiTailwindcss,
  SiLaragon,
} from "react-icons/si";

export const tags = {
  Arduino: { icon: <SiArduino color="#00979D" />, color: "#00979D" },
  Django: { icon: <SiDjango color="#092E20" />, color: "#092E20" },
  Docker: { icon: <FaDocker color="#0db7ed" />, color: "#0db7ed" },
  FastAPI: { icon: <SiFastapi color="#05998B" />, color: "#05998B" },
  Flutter: { icon: <SiFlutter color="#02569B" />, color: "#02569B" },
  Javascript: { icon: <FaJs color="#F7DF1E" />, color: "#F7DF1E" },
  Laragon: { icon: <SiLaragon color="#0E83CD" />, color: "#0E83CD" },
  Laravel: { icon: <FaLaravel color="#FF2D20" />, color: "#FF2D20" },
  MUI: { icon: <SiMui color="#007FFF" />, color: "#007FFF" },
  MySQL: { icon: <SiMysql color="#4479A1" />, color: "#4479A1" },
  Python: { icon: <FaPython color="#3776AB" />, color: "#3776AB" },
  RaspberryPi: { icon: <SiRaspberrypi color="#C51A4A" />, color: "#C51A4A" },
  React: { icon: <FaReact color="#61DAFB" />, color: "#61DAFB" },
  ReactAdmin: { icon: <FaReact color="#61DAFB" />, color: "#61DAFB" },
  Redis: { icon: <SiRedis color="#DC382D" />, color: "#DC382D" },
  Tailwind: { icon: <SiTailwindcss color="#06B6D4" />, color: "#06B6D4" },
  Tkinter: { icon: <FaWindowMaximize color="#3776AB" />, color: "#3776AB" },
  TypeScript: { icon: <SiTypescript color="#3178C6" />, color: "#3178C6" },
} as const;

export type Tag = keyof typeof tags;

export interface Project {
  title: string;
  shortDesription?: string;
  description?: string;
  descriptionMd?: string;
  images: string[];
  tags: Tag[];
  links?: string[];
}
