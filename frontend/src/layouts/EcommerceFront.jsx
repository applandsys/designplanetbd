
import React from "react";
import { ReduxProvider } from '@/providers/ReduxProvider';
import Footer from "@/components/theme/Footer";
import Header from "@/components/layouts/Header";
import {SnackbarProvider} from "@/components/ui/SnackbarProvider";

export const metadata = {
    title: "Omninest Ecommerce Website ",
    description: "Developed By Tarique",
};

export default function EcommerceFrontLayout({ children }) {
    return (
        <div >
            <ReduxProvider>
                <SnackbarProvider>
                    <Header/>
                    <main className="min-h-screen flex flex-col md:p-8 mx-auto p-2">
                        {children}
                    </main>
                    <Footer/>
                </SnackbarProvider>
            </ReduxProvider>
        </div>
    );
}
