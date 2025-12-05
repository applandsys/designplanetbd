'use client';

import React, {useEffect, useState} from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import {getCategories} from "@/services/ecommerce/getCategories";
import Link from 'next/link';
import config from "@/config";

export default function NavigationMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <nav className="relative">
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
                <div
                    className={`fixed top-0 left-0 h-full w-[350px] bg-white shadow-lg border border-green-100 p-4 z-50 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-full flex justify-start">
                            <Image
                                src="/images/logo.png"
                                width={120}
                                height={120}
                                alt="logo"
                                className="max-w-full h-auto"
                            />
                        </div>
                        <button
                            className="absolute top-2 right-3 text-white text-2xl border border-gray-300 bg-green-400 rounded-full hover:bg-green-200"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search for items..."
                            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-2 font-semibold text-sm text-green-600 flex items-center gap-2 cursor-pointer">
                        <FiMenu className="w-4 h-4" />
                        Browse Categories
                    </div>
                    <ul className="space-y-2 text-sm">
                        {categories?.length > 0 ? (
                            categories.map((item, idx) => (
                                <li className="border-b  cursor-pointer py-2" key={idx}>
                                    <Link
                                        href={`/category/${item.slug}`}
                                        key={idx}
                                        className=""
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="flex items-center px-2">
                                            <Image
                                                src={`${config.publicPath}/images/categories/${item.image}`}
                                                alt={item.name}
                                                width={60}
                                                height={60}
                                                className="w-6 h-6 rounded"
                                            />
                                            <span className="transition px-2 duration-300 ease-in-out cursor-pointer hover:text-[#3bb77e] text-xs font-semibold text-gray-700">
                                          {item.name}
                                      </span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="border-b  cursor-pointer">No categories found.</li>
                        )}
                    </ul>

                    <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
                        <div>
                            <Link
                                href='/auth/signup'
                            >
                                Signup
                            </Link>
                        </div>
                        <div>
                            <Link
                                href='/auth/login'
                            >
                                Log In
                            </Link>
                        </div>
                        <div>+880 0196 9865256</div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">Follow Us</p>
                        <div className="flex gap-3">
                            <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                                <FaTwitter />
                            </a>
                            <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                                <FaInstagram />
                            </a>
                            <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                                <FaPinterestP />
                            </a>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-between  mt-2 mx-2">
                    <div className="flex justify-between ">
                        <ul className="hidden md:flex space-x-6 text-xs">
                            <li><a href="#" className="hover:text-blue-500">About</a></li>
                            <li><a href="#" className="hover:text-blue-500">My Account</a></li>
                            <li><a href="#" className="hover:text-blue-500">Wishlist</a></li>
                            <li><a href="#" className="hover:text-blue-500">Order Tracking</a></li>
                        </ul>
                        {!isOpen && (
                            <button
                                className="block md:hidden focus:outline-none ml-2"
                                onClick={() => setIsOpen(true)}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="text-xs md:text-sm text-right">
                        Need help? Call Us:{" "}
                        <span className="text-green-600 font-medium">+ 0196 9865256</span>
                    </div>
                </div>
            </nav>
        </>
    );
}