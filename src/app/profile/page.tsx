'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React, { useState } from "react";

type Notice = { type: "success" | "error"; text: string } | null;

const getInitials = (name?: string | null) =>
    (name || "?")
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const Avatar = ({ src, name, size = 128 }: { src?: string | null; name?: string | null; size?: number }) =>
    src ? (
        <Image
            src={src}
            alt={name || "Profile picture"}
            width={size}
            height={size}
            unoptimized
            className="rounded-full object-cover ring-4 ring-base-100 shadow-lg"
            style={{ width: size, height: size }}
        />
    ) : (
        <div
            className="rounded-full bg-primary text-primary-content flex items-center justify-center font-bold ring-4 ring-base-100 shadow-lg"
            style={{ width: size, height: size, fontSize: size / 3 }}
        >
            {getInitials(name)}
        </div>
    );

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [profileNotice, setProfileNotice] = useState<Notice>(null);

    const [savingPassword, setSavingPassword] = useState(false);
    const [passwordNotice, setPasswordNotice] = useState<Notice>(null);

    const onProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setProfileNotice(null);

        const { error } = await authClient.updateUser({
            name: (name ?? user?.name ?? "").trim(),
            image: (image ?? user?.image ?? "").trim() || undefined,
        });

        setProfileNotice(
            error
                ? { type: "error", text: error.message || "Could not update your profile." }
                : { type: "success", text: "Profile updated." }
        );
        setSaving(false);
    };

    const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const currentPassword = String(data.get("currentPassword"));
        const newPassword = String(data.get("newPassword"));
        const confirmPassword = String(data.get("confirmPassword"));

        if (newPassword !== confirmPassword) {
            setPasswordNotice({ type: "error", text: "New passwords do not match." });
            return;
        }

        setSavingPassword(true);
        setPasswordNotice(null);

        const { error } = await authClient.changePassword({
            currentPassword,
            newPassword,
            revokeOtherSessions: true,
        });

        if (error) {
            setPasswordNotice({ type: "error", text: error.message || "Could not change your password." });
        } else {
            setPasswordNotice({ type: "success", text: "Password changed." });
            form.reset();
        }
        setSavingPassword(false);
    };

    if (isPending) {
        return (
            <div className="mx-auto max-w-5xl p-4 space-y-4">
                <div className="skeleton h-40 w-full" />
                <div className="skeleton h-80 w-full" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto max-w-md p-8 text-center">
                <h1 className="text-2xl font-bold">You are signed out</h1>
                <p className="mt-2 text-base-content/70">Sign in to view and edit your profile.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl p-4 md:p-8">
            {/* Cover */}
            <div className="relative">
                <div className="h-40 md:h-52 rounded-box bg-gradient-to-r from-red-700 via-rose-600 to-orange-500" />
                <div className="absolute -bottom-16 left-6 md:left-10">
                    <Avatar src={user.image} name={user.name} size={128} />
                </div>
            </div>

            {/* Header */}
            <div className="mt-20 px-2 md:px-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-base-content/70">{user.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`badge ${user.emailVerified ? "badge-success" : "badge-warning"} badge-soft`}>
                        {user.emailVerified ? "Email verified" : "Email not verified"}
                    </span>
                    {user.createdAt && (
                        <span className="badge badge-ghost">
                            Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
                {/* Profile details */}
                <form onSubmit={onProfileSubmit} className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-3">
                    <div className="card-body">
                        <h2 className="card-title">Profile details</h2>
                        <p className="text-sm text-base-content/70">This is how you appear across the site.</p>

                        <fieldset className="fieldset mt-2">
                            <label className="label" htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="input w-full"
                                placeholder="Your name"
                                value={name ?? user.name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="label mt-2" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="input w-full"
                                value={user.email}
                                readOnly
                                disabled
                            />

                            <label className="label mt-2" htmlFor="image">Profile image URL</label>
                            <div className="flex items-center gap-3">
                                <input
                                    id="image"
                                    name="image"
                                    type="url"
                                    className="input w-full"
                                    placeholder="https://example.com/photo.jpg"
                                    value={image ?? user.image ?? ""}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <div className="shrink-0">
                                    <Avatar src={image ?? user.image} name={name ?? user.name} size={40} />
                                </div>
                            </div>
                        </fieldset>

                        {profileNotice && (
                            <div role="alert" className={`alert alert-soft ${profileNotice.type === "success" ? "alert-success" : "alert-error"} mt-2`}>
                                <span>{profileNotice.text}</span>
                            </div>
                        )}

                        <div className="card-actions justify-end mt-4">
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving && <span className="loading loading-spinner loading-sm" />}
                                Save changes
                            </button>
                        </div>
                    </div>
                </form>

                {/* Password */}
                <form onSubmit={onPasswordSubmit} className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-2 self-start">
                    <div className="card-body">
                        <h2 className="card-title">Password</h2>
                        <p className="text-sm text-base-content/70">Changing it signs you out on other devices.</p>

                        <fieldset className="fieldset mt-2">
                            <label className="label" htmlFor="currentPassword">Current password</label>
                            <input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className="input w-full" />

                            <label className="label mt-2" htmlFor="newPassword">New password</label>
                            <input id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" className="input w-full" />

                            <label className="label mt-2" htmlFor="confirmPassword">Confirm new password</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className="input w-full" />
                        </fieldset>

                        {passwordNotice && (
                            <div role="alert" className={`alert alert-soft ${passwordNotice.type === "success" ? "alert-success" : "alert-error"} mt-2`}>
                                <span>{passwordNotice.text}</span>
                            </div>
                        )}

                        <div className="card-actions justify-end mt-4">
                            <button type="submit" className="btn btn-outline" disabled={savingPassword}>
                                {savingPassword && <span className="loading loading-spinner loading-sm" />}
                                Change password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;