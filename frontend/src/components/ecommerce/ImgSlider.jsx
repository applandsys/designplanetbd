"use client";

import { useState } from "react";
import Image from "next/image";
import config from "@/config";

// Image Data
const images = [
    {
        title: "Don't miss Amazing Grocery Deal",
        subtTitle: "Sign up for the daily newsletter",
        path: `${config.publicPath}/images/slider/slider-1.png`,
        buttonText: "Explore Collection",
    },
    {
        title: "Fresh Vegetables Big Discount",
        subtTitle: "Save upto 50% off on your first order",
        path: `${config.publicPath}/images/slider/slider-2.png`,
        buttonText: "Explore Collection"
    },
    {
        title: "Winter Special Collection",
        subtTitle: "Get ready for the cold season with exclusive deals",
        path: `${config.publicPath}/images/slider/slider-3.png`,
        buttonText: "Explore Collection"
    },
];

export default function ImgSlider() {
    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [showArrows, setShowArrows] = useState(false);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            setCurrent((prev) => (prev + 1) % images.length);
        } else if (distance < -minSwipeDistance) {
            setCurrent((prev) => (prev - 1 + images.length) % images.length);
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    const goToSlide = (index) => setCurrent(index);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div
            className="relative w-full overflow-hidden rounded-sm bg-gray-200 group"
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
            {/* Slides */}
            {images.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    {/* Content Container with MASKING */}
                    <div className="absolute w-full md:w-[calc(100%+80px)] h-full flex flex-col justify-center text-left z-20 ml-24 sm:ml-32 md:ml-40 overflow-hidden">
                        {/* Title - Masked animation */}
                        <div
                            className={`transition-all duration-1000 ease-out delay-200 ${
                                index === current
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-[-50%] opacity-70"
                            }`}
                        >
                            <h1 className="text-gray-950 md:text-6xl font-bold drop-shadow-lg mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-md">
                                {item.title}
                            </h1>
                        </div>

                        {/* Subtitle - Masked animation */}
                        <div
                            className={`transition-all duration-1000 ease-out delay-400 ${
                                index === current
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-[-50%] opacity-70"
                            }`}
                        >
                            <h2 className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md mb-6">
                                {item.subtTitle}
                            </h2>
                        </div>

                        {/* Button - Masked animation */}
                        {item.buttonText && (
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
                                        <span className="z-10 relative">{item.buttonText}</span>
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

                    {/* Background Image */}
                    <Image
                        src={item.path}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover rounded-sm"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1448px"
                    />
                </div>
            ))}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className={`arrow-button absolute top-1/2 -left-12 transform -translate-y-1/2 bg-transparent border border-black rounded-full p-3 z-30 transition-all duration-500 ease-in-out group-hover:left-4 hover:bg-black hover:border-black ${
                    showArrows ? "left-4" : "-left-12"
                }`}
                aria-label="Previous slide"
            >
                <svg
                    className="w-5 h-5 transition-colors duration-300 text-black hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className={`arrow-button absolute top-1/2 -right-12 transform -translate-y-1/2 bg-transparent border border-black rounded-full p-3 z-30 transition-all duration-500 ease-in-out group-hover:right-4 hover:bg-black hover:border-black ${
                    showArrows ? "right-4" : "-right-12"
                }`}
                aria-label="Next slide"
            >
                <svg
                    className="w-5 h-5 transition-colors duration-300 text-black hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none select-none ${
                            index === current ? "w-4 h-4" : "w-2.5 h-2.5"
                        }`}
                    >
                        <div className="absolute inset-0 rounded-full border border-black transition-all duration-300"></div>
                        {index === current && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                    </button>
                ))}
            </div>
        </div>
    );
}