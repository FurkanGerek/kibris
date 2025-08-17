import { useEffect } from "react"
import Slider from "~/components/Slider"
import News from "~/pages/home/components/News"
import Side from "~/pages/home/components/Side"
import { get } from "~/requests"
export default () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get("/post")
                console.log(data) // artık Promise değil, gerçek veri
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        }

        fetchData()
    }, [])

    return <div>
        <Slider />
        <div className="flex px-20 py-5 gap-6">
            <div className="flex gap-2 flex-col flex-1">
                <h1 className="text-xl border-b-3 border-red-500 pb-2">
                    Haberler
                </h1>

                <News />
                <div className="grid grid-cols-2 gap-2 flex-1">
                    <News />
                    <News />
                    <News />
                    <News />
                </div>
            </div>
            <Side />
        </div>
    </div>
}