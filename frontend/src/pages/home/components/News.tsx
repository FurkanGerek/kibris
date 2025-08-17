export default () => {
    return (
        <div className="flex-1 flex gap-4 bg-white shadow-sm rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    {/* Başlık: 34px font, 42px satır yüksekliği, bold */}
                    <span className="text-[34px] leading-[42px] font-bold text-gray-800">
                        Kıbrıs'ın Tarihi Limanı: Girne Kalesi ve Batık Gemi Müzesi
                    </span>
                    {/* Açıklama: 16px font, 20px satır yüksekliği */}
                    <span className="text-base text-gray-600 leading-5 font-normal">
                        Girne'nin simgesi haline gelen tarihi kalesi, içerisinde barındırdığı ve dünyanın en eski batık gemilerinden biri olarak kabul edilen Batık Gemi Müzesi ile ziyaretçilerini binlerce yıllık bir tarih yolculuğuna çıkarıyor.
                    </span>
                </div>
                
                {/* Yazar: 14px font, bold, 20px üst boşluk */}
                <div className="flex gap-3 text-sm text-gray-500 mt-5">
                    <span className="font-bold">Prof. Dr. Ala Atun</span>
                    <span>·</span>
                    <span>12 Ağustos 2025</span>
                </div>
            </div>

            <div className="w-1/4 relative aspect-square">
                <img
                    src="https://www.elityavru.com/images/blog/munchkin-kedisi.webp"
                    alt=""
                    className="w-full h-full object-cover rounded"
                />
            </div>
        </div>
    )
}