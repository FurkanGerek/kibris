import { MdKeyboardArrowDown } from "react-icons/md"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default ({ title, menu }: { title: string, menu?: string[] }) => {
    const [open, setOpen] = useState<boolean>(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 200);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // h-14 yerine h-10 kullanıldı, böylece öğe tüm navbar yüksekliğini kaplar
            className="group relative flex gap-1 text-xs font-semibold h-10 items-center px-4 text-gray-950 cursor-pointer"
            style={{ lineHeight: '21.4px' }}
        >
            {/* Animasyonlu Arka Plan */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500 transition-all duration-300 ease-in-out group-hover:h-full"></div>

            {/* Metin ve İkonlar */}
            <div className="relative z-10 flex items-center gap-1 transition-colors duration-300 ease-in-out group-hover:text-white">
                {menu ? (
                    <>
                        <span>{title.toUpperCase()}</span>
                        <MdKeyboardArrowDown />
                    </>
                ) : (
                    <Link to={title} className="relative z-10">{title.toUpperCase()}</Link>
                )}
            </div>
            
            {open && menu && (
                <div className="absolute top-full left-0 mt-0 text-gray-950 bg-gray-50 border-t-2 border-red-500 rounded-b-md overflow-hidden shadow-lg">
                    <ul>
                        {menu.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 whitespace-nowrap font-normal hover:bg-gray-200 cursor-pointer"
                            >
                                <Link to={item} className="block w-full">{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}