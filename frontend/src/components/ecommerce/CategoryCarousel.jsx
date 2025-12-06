"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { getCategories } from "@/services/ecommerce/getCategories";
import Link from "next/link";
import config from '@/config';

export default function CategoryCarousel() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [visibleItems, setVisibleItems] = useState(2);
    const [isLargeDevice, setIsLargeDevice] = useState(false);
    const [tapStartTime, setTapStartTime] = useState(0);
    const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res);
        }).catch(error => setError(error)).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const checkDeviceSize = () => {
            const isLarge = window.innerWidth >= 1024;
            setIsLargeDevice(isLarge);
            setVisibleItems(isLarge ? 1 : categories.length === 1 ? 1 : 2);
        };

        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, [categories]);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const itemWidth = 160;
        const gap = 24;
        const scrollAmount = itemWidth + gap;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (direction === "next") {
            const newScrollLeft = Math.min(container.scrollLeft + scrollAmount, maxScroll);
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        } else {
            const newScrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        const x = e.pageX || (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
        setStartX(x);
        setScrollLeft(scrollRef.current.scrollLeft);
        setTapStartTime(Date.now());
        setTapPosition({ x, y });
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        const endX = e.pageX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].pageX : 0);
        const endY = e.pageY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].pageY : 0);
        const tapDuration = Date.now() - tapStartTime;
        const distance = Math.sqrt(
            Math.pow(endX - tapPosition.x, 2) + Math.pow(endY - tapPosition.y, 2)
        );

        // Consider it a tap if it's short duration and small movement
        const isTap = tapDuration < 300 && distance < 10;

        setIsDragging(false);

        // If it was a tap, find and trigger the link
        if (isTap) {
            const target = e.target;
            const link = target.closest('a');
            if (link) {
                e.preventDefault();
                window.location.href = link.href;
            }
        }
    };

    const canScroll = () => {
        return scrollRef.current && scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
    };

    const getContainerStyle = () => {
        if (isLargeDevice) {
            return { width: '100%', margin: '0 auto' };
        }
        const itemWidth = 160;
        const gap = 24;
        const containerWidth = (itemWidth * visibleItems) + (gap * (visibleItems - 1));
        return { width: `${containerWidth}px`, margin: '0 auto' };
    };

    const scrollContainerStyle = {
        ...getContainerStyle(),
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch"
    };

    return (
        <div className="w-full mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-gray-900 font-kumbh font-semibold tracking-wide">Explore Collections</h2>
                <Link
                    href="/collections"
                    className="text-black hover:text-red-600 font-medium text-sm transition-colors duration-300 relative group"
                >
                    View All Collection
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full group-hover:animate-width-bounce"></span>
                </Link>
            </div>

            <div
                className="relative"
                onMouseEnter={() => setShowNavButtons(true)}
                onMouseLeave={() => setShowNavButtons(false)}
            >
                {canScroll() && (
                    <>
                        <div className={`absolute inset-y-0 left-0 flex items-center z-30 transition-opacity duration-300 ${showNavButtons ? 'opacity-100' : 'opacity-0'}`}>
                            <button onClick={() => scroll("prev")} aria-label="Scroll left" className="w-10 h-10 bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 backdrop-blur-sm -ml-5">
                                <ArrowLeftIcon className="h-5 w-5 text-white" />
                            </button>
                        </div>

                        <div className={`absolute inset-y-0 right-0 flex items-center z-30 transition-opacity duration-300 ${showNavButtons ? 'opacity-100' : 'opacity-0'}`}>
                            <button onClick={() => scroll("next")} aria-label="Scroll right" className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 -mr-5">
                                <ArrowRightIcon className="h-5 w-5 text-gray-800" />
                            </button>
                        </div>
                    </>
                )}

                {loading && <p className="text-center py-8">Loading...</p>}

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth pb-10 select-none scrollbar-hide"
                    style={scrollContainerStyle}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    onDragStart={(e) => e.preventDefault()}
                >
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((cat) => (
                            <div key={cat.id} className="flex-shrink-0">
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className="block"
                                    onClick={(e) => {
                                        // Prevent navigation if we were dragging
                                        if (isDragging) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <div className="group relative">
                                        <div className="w-40 h-52 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-700 ease-out relative transform hover:scale-[1.02]">
                                            <div className="w-full h-full">
                                                <Image
                                                    src={`${config.publicPath}/images/categories/${cat.image}`}
                                                    alt={cat.name}
                                                    width={160}
                                                    height={208}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                                    draggable="false"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                                                <button className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-lg border border-gray-200 transition-all duration-700 ease-out min-w-[120px] text-sm font-medium whitespace-nowrap group/btn transform group-hover:scale-[1.02]">
                                                    <span className="transition-all duration-700 ease-out group-hover/btn:text-red-600">
                                                        {cat.name}
                                                    </span>
                                                    <span className="ml-1 inline-block opacity-0 text-gray-800 transition-all duration-500 transform group-hover:opacity-100 group-hover:rotate-[-45deg] group-hover:translate-x-1 group-hover:text-red-600" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                                                        &rarr;
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : !loading && (
                        <div className="w-full text-center py-12">
                            <p className="text-gray-500 text-lg">No categories found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}