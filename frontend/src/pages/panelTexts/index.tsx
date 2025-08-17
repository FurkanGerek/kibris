import { useState, useEffect, type ChangeEvent } from "react";
import Editor from "~/components/Editor";
import { get, post, put, del } from "~/requests";

type Category = {
    id: number;
    name: string;
};

type Post = {
    id: number;
    header: string;
    content: string;
    category: Category | null;
    isApproved: boolean;
    cover?: string;
};

export default function PostManager() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>("");
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const token = localStorage.getItem("token") || "";

    // Kategorileri çek
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

    // Postları çek
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await get<{ posts: Post[] }>("/post/");
            setPosts(Array.isArray(data.posts) ? data.posts : []);
        } catch (err) {
            console.error("Postlar alınamadı:", err);
        }
    };

    // Düzenleme için post yükle
    const handleEdit = (post: Post) => {
        setEditingPostId(post.id);
        setTitle(post.header);
        setContent(post.content);
        setCategory(post.category?.id || null);
        if (post.cover) setCoverPreview(post.cover);
    };

    // Cover seçimi ve önizleme
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCover(file);
        const reader = new FileReader();
        reader.onload = () => setCoverPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Gönderi ekleme / güncelleme
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return alert("Başlık veya içerik boş olamaz!");
        if (!category) return alert("Kategori seçiniz!");
        if (!token) return alert("Giriş yapılmamış!");

        try {
            const formData = new FormData();
            formData.append("header", title);
            formData.append("content", content);
            formData.append("categoryId", String(category));
            if (cover) formData.append("cover", cover);

            if (editingPostId) {
                await put(`/post/${editingPostId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Gönderi güncellendi!");
            } else {
                await post("/post/", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Gönderi oluşturuldu!");
            }

            handleClear();
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert("İşlem başarısız!");
        }
    };

    // Gönderi onaylama
    const handleApprove = async (postId: number) => {
        if (!token) return alert("Giriş yapılmamış!");
        try {
            await post(
                `/post/approve/${postId}`,
                { isApproved: true },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Gönderi onaylandı!");
            setPosts((prev) =>
                prev.map((p) => (p.id === postId ? { ...p, isApproved: true } : p))
            );
        } catch (err) {
            console.error(err);
            alert("Onay başarısız!");
        }
    };

    // Gönderi silme
    const handleDelete = async (postId: number) => {
        if (!token) return alert("Giriş yapılmamış!");
        const confirmDelete = window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            await del(
                `/post/${postId}`, // Backend’e uygun DELETE endpoint kullanılabilir
                { Authorization: `Bearer ${token}` }
            );
            alert("Gönderi silindi!");
            setPosts((prev) => prev.filter((p) => p.id !== postId));
        } catch (err) {
            console.error(err);
            alert("Silme işlemi başarısız!");
        }
    };

    // Form temizleme
    const handleClear = () => {
        setEditingPostId(null);
        setTitle("");
        setCategory(null);
        setContent("");
        setCover(null);
        setCoverPreview("");
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Form */}
            <div className="p-4 border rounded-xl">
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

                <div className="mb-2">
                    <input type="file" accept="image/*" onChange={handleCoverChange} />
                    {coverPreview && (
                        <img
                            src={coverPreview}
                            alt="Cover Preview"
                            className="mt-2 w-40 h-40 object-cover rounded-xl border"
                        />
                    )}
                </div>

                <Editor onChange={setContent} value={content} />

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
                        {editingPostId ? "Güncelle" : "Gönder"}
                    </button>
                </div>
            </div>

            {/* Post Listesi */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Gönderiler</h2>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="p-4 border rounded-xl flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">{post.header}</h3>
                            <span
                                className={`px-2 py-1 rounded-xl text-sm ${post.isApproved ? "bg-green-200" : "bg-red-200"
                                    }`}
                            >
                                {post.isApproved ? "Onaylı" : "Onaylanmadı"}
                            </span>
                        </div>
                        <p>Kategori: {post.category?.name || "Kategori yok"}</p>

                        {post.cover && (
                            <img
                                src={post.cover}
                                alt="cover"
                                className="w-32 h-32 object-cover rounded-xl"
                            />
                        )}
                        <div className="flex gap-2 mt-2">
                            {!post.isApproved && (
                                <button
                                    className="border border-green-500 bg-green-300 py-1 px-2 rounded-xl text-sm"
                                    onClick={() => handleApprove(post.id)}
                                >
                                    Onayla
                                </button>
                            )}
                            <button
                                className="border border-blue-500 bg-blue-300 py-1 px-2 rounded-xl text-sm"
                                onClick={() => handleEdit(post)}
                            >
                                Düzenle
                            </button>
                            <button
                                className="border border-red-500 bg-red-300 py-1 px-2 rounded-xl text-sm"
                                onClick={() => handleDelete(post.id)}
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
