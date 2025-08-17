export default () => {
    return <div className="flex-1 flex flex-col items-center gap-2  rounded-xl px-2.5 py-1.5 hover:-translate-y-0.5 transition-all cursor-pointer">
        <div className="aspect-[2/3] w-2/3 overflow-hidden rounded-lg bg-gray-100">
            <img
                src="https://www.otuken.com.tr/u/otuken/img/c/d/i/direnis-hatiralarim-kapak-1733480779.png"
                alt="Book cover"
                className="h-full w-full object-cover"
            />
        </div>
        <div className="flex flex-col items-center gap-1">
            <span className="before:w-1 before:h-1 before:rounded-full">
                Tugay Uluçevik
            </span>
            <span>
                27 Haziran 2017
            </span>
        </div>
    </div>

}