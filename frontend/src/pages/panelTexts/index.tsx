import { useState, useEffect } from "react";
import Editor from "~/components/Editor";
import { get, post } from "~/requests";

type Category = {
    id: number;
    name: string;
};

export default function PostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number | null>(null);
    const token = localStorage.getItem("token") || "";

    // Kategorileri backend'den çek
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

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return alert("Başlık veya içerik boş olamaz!");
        if (!category) return alert("Kategori seçiniz!");
        if (!token) return alert("Giriş yapılmamış!");

        try {
            await post(
                "/post/",
                { header: title, content, categoryId: category },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Gönderi başarıyla oluşturuldu!");
            handleClear();
        } catch (err) {
            console.error(err);
            alert("Gönderi oluşturulamadı!");
        }
    };

    const handleClear = () => {
        setTitle("");
        setCategory(null);
        setContent("");
    };

    return (
        <>
            <input
                type="text"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl text-xl px-4 py-2 mb-2"
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                className="w-full bg-gray-50 border border-gray-300 rounded-xl text-xl px-4 py-2 mb-2"
                value={category ?? ""}
                onChange={(e) => setCategory(Number(e.target.value))}
            >
                <option value="">Kategori Seçiniz</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <Editor onChange={setContent} />

            <div className="flex w-full gap-2 mt-4">
                <button
                    className="border border-gray-500 py-2 rounded-xl flex-1"
                    onClick={handleClear}
                >
                    Temiz
                </button>
                <button
                    className="border border-gray-500 bg-red-300 py-2 rounded-xl flex-1"
                    onClick={handleSubmit}
                >
                    Gönder
                </button>
            </div>
        </>
    );
}
