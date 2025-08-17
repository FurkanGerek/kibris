import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "~/requests"; // Daha önce tanımladığın get fonksiyonu

interface PageData {
    title: string;
    content: string;
}

export default () => {
    const { title } = useParams<{ title: string }>();
    const [page, setPage] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await get<PageData>(`/page/${title}`);
                console.log(data);

                setPage(data);
            } catch (err: any) {
                console.error(err);
                setError("Sayfa yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [title]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;
    if (!page) return <p>Sayfa bulunamadı.</p>;

    return (
        <div className="w-3/6 bg-gray-50 border-2 border-gray-300 mx-auto my-5 py-8 px-10 rounded-xl flex flex-col gap-2">
            <h1 className="font-semibold text-3xl">{page.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
    );
};
