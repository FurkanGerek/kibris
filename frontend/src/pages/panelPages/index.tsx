import { useState } from "react";
import Editor from "~/components/Editor";
import { post } from "~/requests"; // Kendi post fonksiyonunu kullanıyoruz

export default function PageForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleClear = () => {
        setTitle("");
        setContent("");
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Sayfa başlığı veya içerik boş olamaz!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Giriş yapılmamış!");
            return;
        }

        const pageData = {
            title: title,
            content: content,
        };

        try {
            const res = await post("/page/", pageData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Sunucudan gelen yanıt:", res);
            alert("Sayfa başarıyla oluşturuldu!");
            handleClear();
        } catch (err) {
            console.error(err);
            alert("Sayfa gönderilemedi!");
        }
    };

    return (
        <>
            <input
                type="text"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl text-xl px-4 py-2 mb-2"
                placeholder="Sayfa Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

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
