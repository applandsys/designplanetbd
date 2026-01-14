"use client";

import React, {useEffect, useState} from 'react';
import config from '@/config';
import Image from 'next/image';
import {fetchBannerBySlug} from "@/services/site/BannerData";
import Link from "next/link";


const PromoCards = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetchBannerBySlug('promo-1').then((json) => {
            if (json.success) {
                setBanners(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Fetching Data ...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative rounded-xl overflow-hidden">
        {banners.length && banners.map((banner, index) => (
            <div
                key={index}
                className={`flex flex-col bg-[${banner.backgroundColor}]`}
            >
                <div className="absolute">
                    <h3 className="text-xl font-semibold   mb-4  font-quicksand  mt-8 ml-20 text-white">{banner.title_text}</h3>
                </div>

                <Image
                    src={`${config.publicPath}/images/banners/${banner.image}`}
                    alt={banner.title_text}
                    width={500} 
                    height={300} 
                    className="h-full object-contain mx-auto rounded-xl"
                />
                <div className="absolute bottom-4 left-20">
                    {
                        banner.url && (
                            <Link className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm w-max ml-20" href={banner.url}>
                                Shop Now →
                            </Link>
                        )
                    }
                </div>
            </div>
        ))}
    </div>
    
    );
};

export default PromoCards;
