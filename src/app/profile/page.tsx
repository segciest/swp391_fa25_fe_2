"use client";

import { useEffect, useState } from "react";
import { decodeToken, JwtPayload } from "../../../utils/decodeToken";
import { fetchUserById } from "@/lib/api";
import ProfileCard from "./ProfileCard";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const decoded = decodeToken(token) as JwtPayload | null;
        if (!decoded || !decoded.userId) {
            console.error("Không tìm thấy userId trong token");
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const data = await fetchUserById(decoded.userId);
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
