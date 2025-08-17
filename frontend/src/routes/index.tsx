import { createBrowserRouter } from "react-router-dom"

import MainLayout from "~/layouts/MainLayout"
import AdminLayout from "~/layouts/AdminLayout"

import Home from "~/pages/home"
import Page from "~/pages/page"
import Login from "~/pages/login"

import PanelTexts from "~/pages/panelTexts"
import PanelPages from "~/pages/panelPages"
import PanelAuthor from "~/pages/panelAuthors"
import PanelRoles from "~/pages/panelRoles"
import PanelAnnouncement from "~/pages/panelAnnouncement"
import PanelCategories from "~/pages/panelCategories"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ":title", // başına / gerek yok
                element: <Page />,
            },
            {
                path: "post",
                element: "posts",
            },
        ],
    },
    {
        path: "/girne",
        element: <Login />,
    },
    {
        path: "/girne/panel",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <PanelTexts />,
            },
            {
                path: "/girne/panel/pages",
                element: <PanelPages />,
            },
            {
                path: "/girne/panel/authors",
                element: <PanelAuthor />,
            },
            {
                path: "/girne/panel/roles",
                element: <PanelRoles />,
            },
            {
                path: "/girne/panel/announcement",
                element: <PanelAnnouncement />,
            },
            {
                path: "/girne/panel/category",
                element: <PanelCategories />,
            },
        ],
    }
])

export default routes
