import Logo from "~/assets/logo.png"
import { Link } from "react-router-dom"
import NavLinks from "./NavLinks"

export default () => {
    // h-20: Navbar'ın toplam yüksekliğini 80px yapar.
    // items-center: Logo ve nav menüsünü dikeyde tam ortalar.
    return <header className="px-5 bg-gray-50 w-full flex items-center justify-between border-b-2 border-gray-300 relative z-50 shadow-sm h-20">
        <Link to="/">
            <img className="h-10" src={Logo} alt="Kıbrıs Kültür Derneği logo" />
        </Link>

        {/* nav etiketinin yüksekliğini kendi içeriği belirleyecek, h-full kaldırıldı. */}
        <nav className="flex">
            <NavLinks title="Kurumsal" menu={["Tarihçe", "Tüzük", "Üyelik", "Doktor Üyelerimiz", "Sıkça Sorular Sorular", "Mali Bilgiler", "Burs İşlemleri"]} />
            <NavLinks title="Yönetim" menu={["Genel Merkaz", "Antalya", "İstanbul", "İzmir", "Mersin"]} />
            <NavLinks title="Kıbrıs" menu={["Kıbrıs Uyuşmazlığı", "Kültürel Etkinlikler", "Kıbrıs ile İlgili Tavsiyeler", "Kıbrıs Türk Kültürü", "Önemli Gün ve Haftalar"]} />
            <NavLinks title="Yayınlarımız" />
            <NavLinks title="Kütüphanemiz" />
            <NavLinks title="Basın" menu={["Basın Açıklamaları", "Basında Biz", "Basında KKTC"]} />
            <NavLinks title="Yazarlar" />
            <NavLinks title="İletişim" menu={["Bize Ulaşın", "Ziyaretçi Defteri"]} />
            <NavLinks title="Üyelik Formu" />
        </nav>
    </header>
}