import { useEffect } from "react"
import Slider from "~/components/Slider"
import News from "~/pages/home/components/News"
import Side from "~/pages/home/components/Side"
import Conflict from "~/pages/home/components/Conflict"
import Book from "~/pages/home/components/Book"
import { get } from "~/requests"

export default () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get("/post")
                console.log(data)
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col gap-8 py-8">
            {/* items-start sınıfı ile sol ve sağ kutular yukarıdan hizalandı */}
            <div className="flex gap-8 items-start">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col self-start">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Haberler
                        </h1>
                        <div className="mt-1 h-1 w-12 bg-red-600 rounded"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <News />
                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <News tiny={true} />
                            <News tiny={true} />
                            <News tiny={true} />
                            <News tiny={true} />
                        </div>
                    </div>
                </div>
                <Side />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col self-start">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Kıbrıs Uyuşmazlığı
                    </h1>
                    <div className="mt-1 h-1 w-12 bg-red-600 rounded"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Conflict />
                    <Conflict />
                    <Conflict />
                    <Conflict />
                    <Conflict />
                    <Conflict />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col self-start">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Kitap Tanıtım
                    </h1>
                    <div className="mt-1 h-1 w-12 bg-red-600 rounded"></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Book />
                    <Book />
                    <Book />
                </div>
            </div>
        </div>
    )
}