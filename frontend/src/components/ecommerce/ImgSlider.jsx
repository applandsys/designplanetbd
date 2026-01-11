"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import config from "@/config";
import {fetchBannerBySlug} from "@/services/site/BannerData";


export default function ImgSlider() {
    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [showArrows, setShowArrows] = useState(false);


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("slider")
            .then((json) => {
                if (json.success) {
                    setBanners(json.data);
                }
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Fetching Data ...</div>;


    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd || banners.length === 0) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            setCurrent((prev) => (prev + 1) % banners.length);
        } else if (distance < -minSwipeDistance) {
            setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    const nextSlide = () => {
        if (banners.length === 0) return;
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        if (banners.length === 0) return;
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToSlide = (index) => setCurrent(index);

    return (
        <div className="relative w-full overflow-hidden rounded-sm bg-gray-200 group"
             style={{
                 height: '0',
                 paddingBottom: '54.92%', // This maintains the 1448.570×796 aspect ratio (796/1448.570 = 0.5492)
                 maxHeight: '796px'
             }}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             onMouseEnter={() => setShowArrows(true)}
             onMouseLeave={() => setShowArrows(false)}
        >
            {banners.length && banners.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <div className="absolute w-full md:w-[calc(100%+80px)] h-full flex flex-col justify-center text-left z-20 ml-24 sm:ml-32 md:ml-40 overflow-hidden">
                        <div
                            className={`transition-all duration-1000 ease-out delay-200 ${
                                index === current
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-[-50%] opacity-70"
                            }`}
                        >
                            <h1 className="text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4 text-center lg:text-left w-full">
                                {item.title_text}
                            </h1>
                        </div>

                        <div
                            className={`transition-all duration-1000 ease-out delay-400 ${
                                index === current
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-[-50%] opacity-70"
                            }`}
                        >
                            <h2 className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md mb-6">
                                {item.sub_text}
                            </h2>
                        </div>

                        {item.is_button && (
                            <div
                                className={`transition-all duration-1000 ease-out delay-600 ${
                                    index === current
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-[-50%] opacity-70"
                                }`}
                            >
                                <div className="explore-btn-container group/btn relative inline-block">
                                    <button
                                        className="bg-black text-white rounded-full font-medium px-8 transition-all duration-500 hover:bg-red-600 whitespace-nowrap h-12 flex items-center justify-center relative overflow-hidden"
                                    >
                                        <span className="z-10 relative">Get Now</span>
                                        <div
                                            className="absolute right-0 top-0 bottom-0 w-0 transition-all duration-500 group-hover/btn:w-10 flex items-center justify-center overflow-hidden"
                                        >
                                            <svg
                                                className="w-5 h-5 transition-all duration-500 opacity-0 group-hover/btn:opacity-100 group-hover/btn:rotate-[-45deg] text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <Image
                        src={`${config.publicPath}/images/banners/${item.image}`}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover rounded-sm"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1448px"
                    />
                </div>
            ))}
        </div>
    );
}