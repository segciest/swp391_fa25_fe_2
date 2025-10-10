"use client";

import { useEffect, useState } from "react";
import { fetchUserById } from "@/lib/api";
import ProfileCard from "./ProfileCard";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (!storedData) {
            setLoading(false);
            return;
        }

        // Parse object từ localStorage
        const parsed = JSON.parse(storedData);
        const userId = parsed.userId;
        const token = parsed.token;

        if (!userId || !token) {
            console.error("Không tìm thấy userId hoặc token trong localStorage");
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const data = await fetchUserById(userId);
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error("Lỗi tải thông tin người dùng:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    if (loading) return <p>Đang tải thông tin người dùng...</p>;
    if (!user) return <p>Không tìm thấy thông tin người dùng.</p>;

    return (
        <main className="profile-page">
            <ProfileCard user={user} />
        </main>
    );
}
