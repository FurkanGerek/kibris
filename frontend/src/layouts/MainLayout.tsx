import { Outlet } from "react-router-dom";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default () => {
    return <div className="flex flex-col min-h-screen">
        <Header />
        {/* Sayfa içeriğini ortalamak ve genişliği sınırlamak için container eklendi */}
        <main className="flex-1 w-full max-w-screen-xl mx-auto px-4">
            <Outlet />
        </main>
        <Footer />
    </div>
}