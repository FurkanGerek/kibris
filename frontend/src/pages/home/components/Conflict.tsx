export default () => {
    return (
        <div className="flex-1 flex flex-col gap-1 bg-white shadow-sm rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            {/* Başlık: 16px font, 20px satır yüksekliği */}
            <span className="text-base leading-5 font-semibold text-gray-800">
                Kıbrıs Müzakere
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>Tugay Uluçevik</span>
                <span className="text-gray-300">|</span>
                <span>27 Haziran 2017</span>
            </div>
        </div>
    )
}