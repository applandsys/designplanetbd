import React from 'react';
import Header from "@/components/layouts/Header";
import Footer from "@/components/theme/Footer";
import {ReduxProvider} from "@/providers/ReduxProvider";
import ContactHero from "@/components/static/ContactHero";
import ContactForm from "@/components/static/ContactForm";

const ContactPage = () => {
    return (
        <ReduxProvider>
            <Header />
            <ContactHero />
            <ContactForm />
            <Footer />
        </ReduxProvider>
    );
};

export default ContactPage;