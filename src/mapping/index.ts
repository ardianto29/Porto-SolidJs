import imagePorto1 from "../assets/images/screencapture-localhost-3000-2024-06-05-20_22_50.png";
import imagePorto2 from "../assets/images/screencapture-tako-id-2024-06-25-19_41_33.png";
import imagePorto3 from "../assets/images/screencapture-apple-clone-vite-six-vercel-app-2024-06-05-20_28_25.png";
import imagePorto4 from "../assets/images/screencapture-bookappme-vercel-app-2024-06-25-02_38_51.png";
import imagePorto5 from "../assets/images/screencapture-localhost-3000-2024-07-05-09_16_17.png";
import imagePorto6 from "../assets/images/screencapture-scroll-millenium-vercel-app-2024-09-15-07_29_27.png";
import imagePorto7 from "../assets/images/screencapture-keep-doc-vercel-app-2024-09-15-05_24_14.png";
import imagePorto8 from "../assets/images/screencapture-roshidere-landing-page-vercel-app-2024-09-15-07_37_29.png";

export const menu = [
  {
    name: "Home",
    hash: "#hero",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Portfolio",
    hash: "#portfolio",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
];

export const portfolios = [
  {
    image: imagePorto1,
    title: "Discord Bot Website (Front-end)",
    link: "https://flantic.vercel.app/",
    tags: ["Nextjs", "React", "Typescript", "Tailwindcss", "Framer Motion"],
    description: "Create a new look for the discord bot website",
  },
  {
    image: imagePorto2,
    title: "Tako.id (Front-end)",
    link: "https://tako.id/",
    tags: ["Typescript", "Tailwindcss", "Nextjs", "Prisma", "Vercel", "Zod"],
    description:
      " HOBIMU JADI CUAN! Pengen dapet penghasilan lebih dari hanya sekedar membuat konten? Langsung aja join Tako sekarang! ",
  },
  {
    image: imagePorto3,
    title: "Apple Web Clone (Front-end)",
    link: "https://apple-clone-vite-six.vercel.app/",
    tags: ["ReactJs", "Javascript", "Tailwindcss", "Vite", "ThreeJS"],
    description:
      " This website is a clone of the Apple website, and I followed the tutorial from Youtube",
  },
  {
    image: imagePorto4,
    title: "Aplikasi Web Sederhana mengelola data Buku",
    link: "https://bookappme.vercel.app/",
    tags: ["HTML", "CSS", "Javascript"],
    description:
      "Aplikasi ini untuk menyimpan buku dibangun dengan memanfaatkan Browser Object Model (BOM), Document Object Model (DOM), dan Event. Untuk Mencegah data tidak hilang dari aplikasi maka dimanfaatkan fungsi web storage dari web client agar aplikasi berjalan optimal.",
  },
  {
    image: imagePorto5,
    title: "Portfolio Website with Solidjs (Front-end)",
    link: "https://my-porto-solid-js.vercel.app/",
    tags: ["SolidJs", "Typescript", "Tailwindcss", "Framer Motion"],
    description: "Personal Website",
  },

  {
    image: imagePorto6,
    title: "Scroll Millenium (Front-end)",
    link: "https://scroll-millenium.vercel.app",
    tags: [
      "ReactJs",
      "Javascript",
      "CSS",
      "Framer Motion",
      "Gsap",
      "locomotive-scroll",
    ],
    description:
      "Build Landing Page Akademi Millenium game Blue Archive and Responsive",
  },
  {
    image: imagePorto7,
    title: "KeepDoc (Full-stack)",
    link: "https://keep-doc.vercel.app",
    tags: [
      "Nextjs",
      "Typescript",
      "Tailwindcss",
      "Liveblocks",
      "Lexical Editor",
      "ShadCN",
    ],
    description:
      "Built with Next.js to handle the user interface, Liveblocks for real-time features and styled with TailwindCSS, LiveDocs is a clone of Google Docs.",
  },
  {
    image: imagePorto8,
    title: "Landing Page Roshidere (Front-end)",
    link: "https://roshidere-landing-page.vercel.app",
    tags: [
      "React",
      "Vite",
      "Typescript",
      "Tailwindcss",
      "Framer Motion",
      "Lenis",
    ],
    description: "Build Landing Page Roshidere and Responsive",
  },
];

export const educationData = [
  {
    title: "Ichibot",
    subtitle: "Web PHP Developer",
    years: "September 2024 - Present"
  },
  {
    title: "Dicoding",
    subtitle: "Belajar Pemrograman Web dan Javascript",
    years: "Mei 2024 - Juni 2024"
  },
  {
    title: "Tako.id",
    subtitle: "Front-end Developer",
    years: "Agustus 2023 - Agustus 2024"
  },

  {
    title: "CodemasterID",
    subtitle: "Junior Mobile React Native",
    years: "April 2023 - Agustus 2023"
  },
  {
    title: "BLKPP DIY",
    subtitle: "Embedded System",
    years: "Jan 2023 - Maret 2023"
  },
  {
    title: "PLN",
    subtitle: "PLN officer",
    years: "2020 - 2021"
  },
  {
    title: "SMK Muhammadiyah 1 Padang",
    subtitle: "Rekayasa Perangkat Lunak",
    years: "2017 - 2020"
  }
];
