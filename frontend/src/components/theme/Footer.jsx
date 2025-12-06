"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ? (
                <footer className="container mx-auto mt-0">
                    <hr />
                    <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs">© 2024 OmninestGlobal. All rights reserved </div>
                        </div>
                    </div>
                </footer>
            ) : (
                <footer className="bg-white text-[#333333] w-full">
                    {/* Main Footer Content */}
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Contact Information - Left Section */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-black">Modave</h3>
                                <div className="space-y-2">
                                    <p className="text-[#333333] text-sm leading-relaxed">
                                        549 Oak St. Crystal Lake, IL 60014
                                    </p>
                                    <button className="text-[#666666] hover:text-[#888888] transition-colors text-sm font-medium uppercase tracking-wide">
                                        GET DIRECTION
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[#333333] text-sm">info@modave.com</p>
                                    <p className="text-[#333333] text-sm">315-666-6688</p>
                                </div>
                            </div>

                            {/* Information Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-black">Information</h4>
                                <ul className="space-y-2">
                                    {['About Us', 'Our Stories', 'Size Guide', 'Contact Us', 'Career', 'My Account'].map((item) => (
                                        <li key={item}>
                                            <a
                                                href="#"
                                                className="text-[#333333] hover:text-black transition-colors text-sm block py-1"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Shop Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-black">Quick Shop</h4>
                                <ul className="space-y-2">
                                    {['Shipping', 'Return & Refund', 'Privacy Policy', 'Terms & Conditions', 'Order FAQs', 'My Wishlist'].map((item) => (
                                        <li key={item}>
                                            <a
                                                href="#"
                                                className="text-[#333333] hover:text-black transition-colors text-sm block py-1"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter Section */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-black">Newsletter</h4>
                                <p className="text-[#333333] text-sm mb-4 leading-relaxed">
                                    Sign up for our newsletter and get 10% off your first purchase.
                                </p>
                                <div className="space-y-3">
                                    {/* Email Input with GO Button Inside */}
                                    <div className="relative">
                                        <div className="relative">
                                            {/* GO Button Inside on the Left */}
                                            <button
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black text-white w-8 h-8 rounded-full hover:bg-[#333333] transition-colors font-medium text-xs flex items-center justify-center z-10"
                                            >
                                                GO
                                            </button>
                                            {/* Oval-shaped input with padding for button */}
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full px-10 py-3 bg-white border border-[#404040] rounded-full text-black placeholder-[#666666] focus:outline-none focus:border-[#666666] transition-colors text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full width horizontal line - Outside the container */}
                    <div className="w-full border-t border-[#dcdcdc]"></div>

                    {/* Bottom Section with whitish background */}
                    <div className="bg-[#fafafa] w-full">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                                {/* Copyright - Left aligned */}
                                <div className="text-[#333333] text-sm w-full lg:w-auto text-center lg:text-left order-2 lg:order-1">
                                    © 2024 Modave. All rights reserved.
                                </div>

                                {/* Payment Methods and Scroll to Top Button grouped together */}
                                <div className="flex flex-col items-center space-y-3 lg:flex-row lg:space-y-0 lg:space-x-6 order-1 lg:order-2">
                                    {/* Payment Methods */}
                                    <div className="flex flex-col items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
                                        <span className="text-[#333333] text-sm">We accept:</span>
                                        <div className="flex space-x-2 justify-center">
                                            {/* Visa */}
                                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center p-1 border border-gray-300">
                                                <div className="text-blue-900 font-bold text-xs">VISA</div>
                                            </div>
                                            {/* Mastercard */}
                                            <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center p-1">
                                                <div className="text-white font-bold text-xs">MC</div>
                                            </div>
                                            {/* PayPal */}
                                            <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center p-1">
                                                <div className="text-white font-bold text-xs">PP</div>
                                            </div>
                                            {/* American Express */}
                                            <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center p-1">
                                                <div className="text-white font-bold text-xs">AMEX</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scroll to Top Button */}
                                    <button
                                        className="bg-[#f0f0f0] hover:bg-[#333333] hover:text-white text-black p-2 rounded-none border border-[#404040] transition-colors flex items-center justify-center"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        aria-label="Scroll to top"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}