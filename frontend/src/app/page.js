import "./globals.css";
import React from "react";
import ImgSlider from "@/components/ecommerce/ImgSlider";
import CategoryCarousel from "@/components/ecommerce/CategoryCarousel";
import PromoCards from "@/components/ecommerce/PromoBox";
import ProductList from "@/components/ecommerce/product/ProductList";
import EcommerceFrontLayout from "@/layouts/EcommerceFront";
import ShopInstagram from '@/components/ecommerce/ShopInstagram';
import SpecialOffer from '@/components/ecommerce/SpecialOffer';
import AnnouncementBar from "@/components/ecommerce/AnnouncementBar";

export default function Home() {
    return (
        <>
            <EcommerceFrontLayout>
                <div className="mx-2" >
                    <ImgSlider/>
                </div>
                <div className=" mx-2" >
                    <AnnouncementBar/>
                </div>
                <div className="my-4 mx-2">
                    <div className="categorySlider">
                        <CategoryCarousel/>
                    </div>
                </div>

                <div className="mx-2">
                    <SpecialOffer/>
                </div>

                <div className="my-4 mt-8 mx-2">
                    <ProductList />
                </div>
                <div className="my-4 mt-8 mx-2">
                    <div className=" mt-4">
                        <PromoCards/>
                    </div>
                </div>
                {/* Add ShopInstagram component here */}
                <div className="my-4 mt-12 mx-2">
                    <ShopInstagram />
                </div>
            </EcommerceFrontLayout>
        </>
    );
}