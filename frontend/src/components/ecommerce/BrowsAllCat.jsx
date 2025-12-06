'use client';

import { ListBulletIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import { getCategories } from '@/services/ecommerce/getCategories';
import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';

export default function CategoryButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null); // ✅ to detect outside clicks

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    // ✅ Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const handleOpenCategory = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={handleOpenCategory}
                className="flex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-[4px] w-full max-w-xs shadow-md transition-colors duration-300"
            >
                {/* Single Grid icon in the center */}
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>

                <span>Categories</span>
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-[400px] bg-white p-1 shadow-lg rounded-md z-20">
                    <div className="grid grid-cols-2 gap-1 text-sm text-gray-800 w-full">
                        {categories?.length > 0 ? (
                            categories.map((item, idx) => (
                                <Link
                                    href={`/category/${item.slug}`}
                                    key={idx}
                                    className="items-center justify-center border border-transparent hover:border-[#3bb77e] hover:rounded-md hover:bg-[#f1fcf7] p-1 gap-1"
                                    onClick={() => setIsOpen(false)} // ✅ closes dropdown on category click
                                >
                                    <div className="flex items-center">
                                        <Image
                                            src={`${config.publicPath}/images/categories/${item.image}`}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="w-6 h-6 rounded"
                                        />
                                        <span className="transition duration-300 ease-in-out cursor-pointer hover:text-[#3bb77e] p-2 text-xs font-semibold text-gray-700">
                      {item.name}
                    </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <span className="col-span-2 text-gray-400">No categories found.</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
