'use client'

import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import useLogoutOnClose from "@/lib/hooks/useLogoutOnClose"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    useLogoutOnClose()
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}