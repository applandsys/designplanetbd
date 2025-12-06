"use client";

import React from 'react';
import Image from 'next/image';

const SpecialOffer = () => {
    return (
        <section className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Banner Section with Special Offer Overlay */}
                <div className="relative">
                    {/* Banner Images Container */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Banner Image */}
                        <div className="lg:w-1/2">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg group">
                                <Image
                                    src="/images/products/Sweeter-banner.jpg"
                                    alt="Sleeveless Collection"
                                    fill
                                    className="object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Right Banner Image */}
                        <div className="lg:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg group">
                                <Image
                                    src="/images/products/sleevless-banner.jpg"
                                    alt="Sweeter Collection"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Special Offer Card - Centered Overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="bg-[#fefaf6] rounded-lg p-6 shadow-2xl border border-[#f5f5f0] text-center w-full max-w-xs">
                            <div className="space-y-3">
                                <h3 className="text-xl font-light text-gray-600 uppercase tracking-wide">
                                    Special Offer!
                                </h3>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    This Week Only
                                </h2>
                                <p className="text-base text-gray-600 font-light">
                                    Reserved for special occasions
                                </p>
                                <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium w-full text-sm">
                                    Explore Collection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid - Separate Section at Bottom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {/* 14-Day Returns */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">14-Day Returns</h4>
                            <p className="text-gray-600 text-sm mt-1">Risk-free shopping with easy returns.</p>
                        </div>
                    </div>

                    {/* Free Shipping */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                            <p className="text-gray-600 text-sm mt-1">No extra costs, just the price you see.</p>
                        </div>
                    </div>

                    {/* 24/7 Support */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                            <p className="text-gray-600 text-sm mt-1">24/7 support, always here just for you.</p>
                        </div>
                    </div>

                    {/* Member Discounts */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Member Discounts</h4>
                            <p className="text-gray-600 text-sm mt-1">Special prices for our loyal customers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;