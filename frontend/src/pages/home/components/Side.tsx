import Slider from "~/components/Slider"

export default () => {
    return <aside className="w-96 bg-gray-50 border-2 border-gray-300 rounded-2xl p-4 flex flex-col gap-4">
        <h1 className="text-xl border-b-3 border-red-500 pb-2">
            Duyurular
        </h1>

        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                <span>KIBRIS TÜRK KÜLTÜR DERNEĞİ GENEL MERKEZİ 55.OLAĞAN GENEL KURUL TOPLANTISI ERTELEME TUTANAĞI</span>
                <span className="text-gray-600">25 Temmuz 2025</span>
            </div>
            <div className="flex flex-col">
                <span>YENİ ÜYELİK DUYURUSU</span>
                <span className="text-gray-600">25 Temmuz 2025</span>
            </div>
        </div>

        <h1 className="text-xl border-b-3 border-red-500 pb-2">
            Köşe Yazarları
        </h1>

        <div className="flex flex-col divide-y-2 divide-gray-300">
            <span className="py-2">İsmail Bozkurt</span>
            <span className="py-2">Prof. Dr. Ata Atun</span>
            <span className="py-2">Hüseyin Laptalı</span>
        </div>
    </aside>
}