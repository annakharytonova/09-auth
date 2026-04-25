

import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
// import { useAuthStore } from "@/lib/store/authStore";

export const metadata: Metadata = {
  title: "NoteHub - Profile",
  description: "View and edit your profile",
  openGraph: {
    title: "NoteHub - Profile",
    description: "View and edit your profile",
    url: `https://notehub.vercel.app/profile/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1042,
        height: 695,
        alt: `NoteHub - Create Note`,
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            {user?.avatar && (<Image
              src={user?.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />)}
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}
