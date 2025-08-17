import { FaRegFileWord, FaBookmark } from "react-icons/fa";
import { FaUser, FaUserGear, FaBullhorn } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Token'ı sil
        navigate("/"); // Giriş sayfasına yönlendir
    };

    return (
        <header className="flex justify-between bg-red-500 w-full h-fit px-8 py-3 items-center text-gray-50">
            <span className="text-xl font-semibold">Yönetim Paneli</span>
            <nav className="flex items-center gap-4">
                <Link className="flex items-center gap-2" to="/girne/panel/">
                    <FaRegFileWord /> Yazılar
                </Link>
                <Link className="flex items-center gap-2" to="/girne/panel/category">
                    <FaRegFileWord /> Kategoriler
                </Link>
                <Link className="flex items-center gap-2" to="/girne/panel/pages">
                    <FaBookmark /> Sayfalar
                </Link>
                <Link className="flex items-center gap-2" to="/girne/panel/authors">
                    <FaUser /> Kullanıcılar
                </Link>
                <Link className="flex items-center gap-2" to="/girne/panel/roles">
                    <FaUserGear /> Roller
                </Link>
                <Link className="flex items-center gap-2" to="/girne/panel/announcement">
                    <FaBullhorn /> Duyurular
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
                >
                    <TbLogout2 /> Çıkış Yap
                </button>
            </nav>
        </header>
    );
}
