export default () => {
    return (
        <div className="flex-1 flex flex-col items-center gap-3 p-4 bg-white shadow-sm rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="aspect-[2/3] w-2/3 overflow-hidden rounded-md shadow-lg">
                <img
                    src="https://www.otuken.com.tr/u/otuken/img/c/d/i/direnis-hatiralarim-kapak-1733480779.png"
                    alt="Book cover"
                    className="h-full w-full object-cover"
                />
            </div>
            {/* Kitap Adı ve Yazar Bilgisi Eklendi */}
            <div className="flex flex-col items-center text-center gap-1">
                <span className="font-bold text-sm text-gray-800">
                    Kıbrıs'ta Varoluş Mücadelemiz
                </span>
                <span className="text-xs text-gray-500">
                    Tugay Uluçevik
                </span>
            </div>
        </div>
    )
}