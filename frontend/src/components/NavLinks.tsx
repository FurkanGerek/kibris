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
        }, 200); // 200ms gecikme
    };

    return <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex relative gap-1 text-sm font-semibold h-15 items-center px-4 border-b-3 border-red-500 hover:bg-red-500 text-gray-950 hover:text-gray-50 transition-colors cursor-pointer">

        {menu ?
            <>
                <span>{title.toUpperCase()}</span>
                <MdKeyboardArrowDown />
            </> :
            <Link to={title}>{title.toUpperCase()}</Link>
        }

        {open && menu ?
            <div className="absolute top-full left-0 mt-5 text-gray-950 bg-gray-50 border-t-3 border-red-500 rounded-b-md overflow-hidden">
                <ul>
                    {menu.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-1 whitespace-nowrap font-normal hover:bg-gray-300 cursor-pointer"
                        >
                            <Link to={item}>{item}</Link>
                        </li>
                    ))}

                </ul>
            </div> : ""}
    </div>
}