import React from 'react';
import Header from "@/components/layouts/Header";
import AboutBdhoms from "@/components/static/AboutBdhoms";
import TeamSection from "@/components/static/TeamSection";
import Footer from "@/components/theme/Footer";
import {ReduxProvider} from "@/providers/ReduxProvider";

const AboutPage = () => {
    return (
        <ReduxProvider>
            <main className="min-h-screen bg-gray-50">
                <Header/>
                <AboutBdhoms/>
                <TeamSection/>
                <Footer/>
            </main>
        </ReduxProvider>
    );
};

export default AboutPage;