import css from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page is not found",
  description: "Page is not found",
  openGraph: {
    title: "Page is not found",
    description: "Page is not found your notes effectively",
    url: `https://notehub.vercel.app/not-found`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1042,
        height: 695,
        alt: `NoteHub`,
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
