export default () => {
    return (
        // Arka plan beyaz yapıldı, gölge eklendi ve kenarlıklar kaldırıldı.
        <aside className="w-96 bg-white shadow-sm rounded-lg p-4 flex flex-col gap-4">
            {/* Başlık Stili Güncellendi */}
            <div className="flex flex-col self-start">
                <h1 className="text-xl font-semibold text-gray-800">
                    Duyurular
                </h1>
                <div className="mt-1 h-1 w-12 bg-red-600 rounded"></div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex flex-col">
                    <span>KIBRIS TÜRK KÜLTÜR DERNEĞİ GENEL MERKEZİ 55.OLAĞAN GENEL KURUL TOPLANTISI ERTELEME TUTANAĞI</span>
                    <span className="text-gray-500 mt-1">25 Temmuz 2025</span>
                </div>
                <div className="flex flex-col">
                    <span>YENİ ÜYELİK DUYURUSU</span>
                    <span className="text-gray-500 mt-1">25 Temmuz 2025</span>
                </div>
            </div>

            {/* Başlık Stili Güncellendi */}
            <div className="flex flex-col self-start mt-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    Köşe Yazarları
                </h1>
                <div className="mt-1 h-1 w-12 bg-red-600 rounded"></div>
            </div>

            <div className="flex flex-col divide-y divide-gray-200">
                <span className="py-2 text-sm">İsmail Bozkurt</span>
                <span className="py-2 text-sm">Prof. Dr. Ata Atun</span>
                <span className="py-2 text-sm">Hüseyin Laptalı</span>
            </div>
        </aside>
    )
}