"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useState, useEffect } from "react";
import type { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { setUser: setAuthUser } = useAuthStore();

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const updatedUser = await updateMe({ username });
    setAuthUser(updatedUser);
    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
