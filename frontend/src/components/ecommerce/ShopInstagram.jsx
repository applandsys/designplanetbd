"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import config from "@/config";
import { GetProducts } from "@/services/ecommerce/GetProducts";

const ShopInstagram = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollerRef = useRef(null);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await GetProducts({
                    limit: 20,
                    page: 1,
                    sortBy: "popular",
                    order: "desc",
                });

                const list =
                    res?.data
                        ?.filter(
                            (p) =>
                                Array.isArray(p.images) &&
                                p.images.length > 0 &&
                                p.status === "active"
                        )
                        .slice(0, 6) ?? [];

                setItems(list.length ? list : getFallback());
            } catch {
                setItems(getFallback());
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    const openDetail = (slug) => {
        window.open(`/product/detail/${slug}`, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="w-full bg-white py-0">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-0 px-4 py-5 md:py-6">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
                        Shop Instagram
                    </h2>
                    <p className="mt-3 text-lg text-black font-light">
                        Elevate your wardrobe with fresh finds today!
                    </p>
                </div>

                {/* Loading skeletons */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-0">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="relative bg-gray-200 animate-pulse aspect-[3/4]"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="relative w-full">
                        {/* Mobile: 2 columns, Desktop: 6 columns - No gaps, no rounded corners */}
                        <div
                            ref={scrollerRef}
                            className="grid grid-cols-2 md:grid-cols-6 gap-0"
                        >
                            {items.map((p) => {
                                const img = p.images?.[0];
                                const src = img
                                    ? `${config.publicPath}/images/products/${img.name}`
                                    : "";

                                return (
                                    <div
                                        key={p.id}
                                        className="group relative aspect-[3/4] overflow-hidden bg-gray-100"
                                    >
                                        {/* Image */}
                                        {src ? (
                                            <Image
                                                src={src}
                                                alt={img?.altText || p.name || "Product image"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 16.66vw"
                                                priority={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                        )}

                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                                        {/* Detail View Button */}
                                        <button
                                            onClick={() => openDetail(p.slug)}
                                            className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white text-black py-4 text-center font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShopInstagram;

/* Fallbacks with actual image paths */
function getFallback() {
    return [
        {
            id: "ig-1",
            name: "Summer Collection",
            slug: "summer-collection",
            images: [{ name: "summer-outfit.jpg", altText: "Summer Fashion" }],
        },
        {
            id: "ig-2",
            name: "Winter Style",
            slug: "winter-style",
            images: [{ name: "winter-look.jpg", altText: "Winter Fashion" }],
        },
        {
            id: "ig-3",
            name: "Casual Wear",
            slug: "casual-wear",
            images: [{ name: "casual-outfit.jpg", altText: "Casual Look" }],
        },
        {
            id: "ig-4",
            name: "Evening Dress",
            slug: "evening-dress",
            images: [{ name: "evening-gown.jpg", altText: "Evening Wear" }],
        },
        {
            id: "ig-5",
            name: "Sports Gear",
            slug: "sports-gear",
            images: [{ name: "sports-outfit.jpg", altText: "Sports Wear" }],
        },
        {
            id: "ig-6",
            name: "Accessories",
            slug: "accessories",
            images: [{ name: "fashion-accessories.jpg", altText: "Style Accessories" }],
        },
    ];
}
