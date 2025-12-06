"use client";

import "./globals.css";
import { Quicksand, Kumbh_Sans } from 'next/font/google';

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { usePathname } from "next/navigation";
import Loader from "@/components/theme/Loader";


const quicksand = Quicksand({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'swap',
})

const kumbhSans = Kumbh_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-kumbh',
    display: 'swap',
})

export default function RootLayout({ children }) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);


    return (
        <html lang="en" className={`${quicksand.variable} ${kumbhSans.variable}`}>
        <body className="font-sans">
        <div>
            {loading && <Loader />}
            {children}
        </div>
        </body>
        </html>
    );
}