import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { get, post, del } from "~/requests";

type Announcement = {
    id: number;
    name: string;
};

export default function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const token = localStorage.getItem("token") || "";

    // Mevcut duyuruları çekme 
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await get<{ announcements: Announcement[] }>("/announcement/",);
                setAnnouncements(data.announcements || []);
            } catch (err) {
                console.error("Duyurular alınamadı:", err);
            }
        };
        fetchAnnouncements();
    }, []);

    // Yeni duyuru ekle
    const handleAdd = async () => {
        if (!newAnnouncement.trim()) return alert("Duyuru boş olamaz!");

        try {
            const created = await post<Announcement>(
                "/announcement/",
                { name: newAnnouncement },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAnnouncements((prev) => [...prev, created]);
            setNewAnnouncement("");
        } catch (err) {
            console.error("Duyuru eklenemedi:", err);
        }
    };

    // Duyuru sil
    const handleDelete = async (id: number) => {
        try {
            await del(`/announcement/${id}`, { Authorization: `Bearer ${token}` });
            setAnnouncements((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            console.error("Duyuru silinemedi:", err);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Duyuru Ekle</h1>
                <div className="flex gap-2 h-fit">
                    <input
                        type="text"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-xl text-xl px-4 py-2"
                        placeholder="Duyuru"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                    />
                    <button
                        onClick={handleAdd}
                        className="flex h-11 w-11 items-center justify-center cursor-pointer bg-green-500 border border-green-600 rounded-xl"
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <h1 className="text-xl font-semibold">Mevcut Duyurular</h1>
                <div className="flex flex-col divide-y-2 divide-gray-300">
                    {announcements.map((a) => (
                        <div key={a.id} className="flex flex-1 py-2 justify-between items-center">
                            <span>{a.name}</span>
                            <button
                                onClick={() => handleDelete(a.id)}
                                className="flex items-center justify-center bg-red-500 text-gray-50 rounded-sm w-6 h-6"
                            >
                                <FaMinus />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
