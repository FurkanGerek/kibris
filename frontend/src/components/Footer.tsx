import Logo from "~/assets/logo.png"

import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
export default () => {
    return <footer className="bg-gray-800 border-t-2 px-20 py-5 grid grid-cols-4 gap-10   border-gray-300 text-gray-50">
        <div className="flex flex-col gap-6">
            <img className="w-2/3" src={Logo} alt="Kıbrıs Kültür Derneği logo" />
            <div className="flex gap-2 items-center">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span>Halk Sokak No:17/2 Yenişehir Çankaya Ankara</span>
            </div>

            <div className="flex gap-2 items-center">
                <FaPhoneAlt className="text-red-500 text- font-semibold" />
                <span>0 (312) 434 14 12</span>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-2xl">Sosyal Medya Hesapları</span>
                <div className="text-gray-500 text-4xl flex gap-3 ">
                    <FaFacebookSquare className="hover:text-gray-50 transition-colors" />
                    <FaSquareXTwitter className="hover:text-gray-50 transition-colors" />
                    <FaSquareInstagram className="hover:text-gray-50 transition-colors" />
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="border-b-2 pb-3 border-red-500">
                <span className="text-xl">Haberler</span>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="border-b-2 pb-3 border-red-500">
                <span className="text-xl">Bağlantılar</span>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="border-b-2 pb-3 border-red-500">
                <span className="text-xl">Galeriler</span>
            </div>
        </div>

    </footer>
}