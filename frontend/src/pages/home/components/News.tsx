export default () => {
    return <div className="flex-1 flex gap-2 bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 hover:shadow hover:-translate-y-0.5 transition-all cursor-pointer">
        <div className="flex-1 flex flex-col gap-2">
            <span className="text-xl font-semibold">
                Kıbrıs'ın Tarihi Limanı: Girne Kalesi ve Batık Gemi Müzesi
            </span>
            <span className="text-sm">
                Girne'nin simgesi haline gelen tarihi kalesi, içerisinde barındırdığı ve dünyanın en eski batık gemilerinden biri olarak kabul edilen Batık Gemi Müzesi ile ziyaretçilerini binlerce yıllık bir tarih yolculuğuna çıkarıyor.
            </span>
        </div>

        <div className="w-1/5 relative aspect-square">
            <img
                src="https://www.elityavru.com/images/blog/munchkin-kedisi.webp"
                alt=""
                className="w-full h-full object-cover rounded"
            />
        </div>
    </div>

}