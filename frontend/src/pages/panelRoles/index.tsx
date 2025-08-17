import { useEffect, useState } from "react";
import { get, del, put, post } from "~/requests";

type Role = {
    id: number;
    name: string;
    canCreatePost: boolean;
    canEditPost: boolean;
    canDeletePost: boolean;
    canApprovePost: boolean;
    canManageRoles: boolean;
    canManageCategories: boolean;
    canManageAnnouncements: boolean; // yeni alan
};

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRole, setNewRole] = useState<Partial<Role>>({
        name: "",
        canCreatePost: false,
        canEditPost: false,
        canDeletePost: false,
        canApprovePost: false,
        canManageRoles: false,
        canManageCategories: false,
        canManageAnnouncements: false, // yeni alan
    });

    const token = localStorage.getItem("token") || "";

    // Roller çek
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await get<{ roles: Role[] }>("/role/");
                setRoles(Array.isArray(data.roles) ? data.roles : []);
            } catch (err) {
                console.error("Roller alınamadı:", err);
            }
        };
        fetchRoles();
    }, []);

    // Rol alanı güncelle
    const handleRoleChange = async (
        id: number,
        field: keyof Role,
        value: string | boolean
    ) => {
        setRoles((prev) =>
            prev.map((role) =>
                role.id === id ? { ...role, [field]: value } : role
            )
        );

        try {
            const role = roles.find((r) => r.id === id);
            if (!role) return;

            const updated = { ...role, [field]: value };
            delete (updated as any).id;

            await put(`/role/${id}`, updated, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            console.error("Rol güncellenemedi:", err);
        }
    };

    // Rol sil
    const handleDelete = async (id: number) => {
        try {
            await del(`/role/${id}`, { Authorization: `Bearer ${token}` });
            setRoles((prev) => prev.filter((role) => role.id !== id));
        } catch (err) {
            console.error("Rol silinemedi:", err);
        }
    };

    // Yeni rol ekle
    const handleAddRole = async () => {
        if (!newRole.name) return alert("Rol ismi boş olamaz!");

        try {
            const created = await post<Role>("/role/", newRole, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRoles((prev) => [...prev, created]);

            // Formu sıfırla
            setNewRole({
                name: "",
                canCreatePost: false,
                canEditPost: false,
                canDeletePost: false,
                canApprovePost: false,
                canManageRoles: false,
                canManageCategories: false,
                canManageAnnouncements: false, // yeni alan
            });
        } catch (err) {
            console.error("Rol eklenemedi:", err);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Mevcut Roller */}
            <div className="flex flex-col gap-1.5">
                <h1 className="text-xl font-semibold">Mevcut Roller</h1>

                <div className="grid grid-cols-9 w-full divide-x border border-gray-400 divide-gray-400 text-center font-semibold">
                    <span>Rolün İsmi</span>
                    <span>Paylaşım Oluşturma</span>
                    <span>Paylaşım Düzenleme</span>
                    <span>Paylaşım Silme</span>
                    <span>Paylaşım Onaylama</span>
                    <span>Rol Yönetimi</span>
                    <span>Kategori Yönetimi</span>
                    <span>Duyuru Yönetimi</span> {/* Yeni alan */}
                    <span>İşlemler</span>
                </div>

                {roles.map((role) => (
                    <div
                        key={role.id}
                        className="grid grid-cols-9 w-full divide-x divide-y divide-gray-300 text-center items-center"
                    >
                        <input
                            type="text"
                            value={role.name}
                            onChange={(e) =>
                                handleRoleChange(role.id, "name", e.target.value)
                            }
                            className="px-2 py-1 border-none text-center bg-transparent"
                        />

                        <input
                            type="checkbox"
                            checked={role.canCreatePost}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canCreatePost", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canEditPost}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canEditPost", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canDeletePost}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canDeletePost", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canApprovePost}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canApprovePost", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canManageRoles}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canManageRoles", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canManageCategories}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canManageCategories", e.target.checked)
                            }
                        />
                        <input
                            type="checkbox"
                            checked={role.canManageAnnouncements}
                            onChange={(e) =>
                                handleRoleChange(role.id, "canManageAnnouncements", e.target.checked)
                            }
                        />

                        <button
                            onClick={() => handleDelete(role.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Sil
                        </button>
                    </div>
                ))}
            </div>

            {/* Yeni Rol Ekleme */}
            <div className="flex flex-col gap-2 border p-4 rounded-md">
                <h2 className="text-lg font-semibold">Yeni Rol Ekle</h2>
                <div className="grid grid-cols-9 gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Rol İsmi"
                        value={newRole.name}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="px-2 py-1 border rounded-md"
                    />

                    <input
                        type="checkbox"
                        checked={newRole.canCreatePost || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canCreatePost: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canEditPost || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canEditPost: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canDeletePost || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canDeletePost: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canApprovePost || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canApprovePost: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canManageRoles || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canManageRoles: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canManageCategories || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canManageCategories: e.target.checked }))
                        }
                    />
                    <input
                        type="checkbox"
                        checked={newRole.canManageAnnouncements || false}
                        onChange={(e) =>
                            setNewRole((prev) => ({ ...prev, canManageAnnouncements: e.target.checked }))
                        }
                    />

                    <button
                        onClick={handleAddRole}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}
