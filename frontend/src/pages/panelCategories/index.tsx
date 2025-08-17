import { useState, useEffect } from "react";
import { get, post, del } from "~/requests";

type Category = {
    id: number;
    name: string;
};

export default function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");

    const token = localStorage.getItem("token") || "";

    // Backend'den kategorileri çek
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await get<{ categories: Category[] }>("/category/");
                setCategories(Array.isArray(data.categories) ? data.categories : []);
            } catch (err) {
                console.error("Kategoriler alınamadı:", err);
            }
        };
        fetchCategories();
    }, []);

    // Yeni kategori ekle
    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            alert("Kategori adı boş olamaz!");
            return;
        }

        if (!token) {
            alert("Giriş yapılmamış!");
            return;
        }

        try {
            const created = await post<Category>(
                "/category/",
                { name: newCategory.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCategories((prev) => [...prev, created]);
            setNewCategory("");
        } catch (err) {
            console.error(err);
            alert("Kategori eklenemedi!");
        }
    };

    // Kategori sil
    const handleDeleteCategory = async (id: number) => {
        if (!token) {
            alert("Giriş yapılmamış!");
            return;
        }

        try {
            await del(`/category/${id}`, { Authorization: `Bearer ${token}` });
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (err) {
            console.error(err);
            alert("Kategori silinemedi!");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-md">
            <h2 className="text-lg font-semibold">Kategori Yönetimi</h2>

            {/* Yeni kategori ekleme */}
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Yeni kategori"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border rounded-md px-2 py-1 flex-1"
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                    Ekle
                </button>
            </div>

            {/* Kategori listesi */}
            <ul className="flex flex-col gap-2">
                {categories.map((cat) => (
                    <li
                        key={cat.id}
                        className="flex justify-between items-center border px-2 py-1 rounded-md"
                    >
                        <span>{cat.name}</span>
                        <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
