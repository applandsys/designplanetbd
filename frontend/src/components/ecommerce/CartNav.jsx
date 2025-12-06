"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import WishListIcon from "@/components/icons/WishListIcon";
import CompareIcon from "@/components/icons/CompareIcon";
import UserIcon from "@/components/icons/UserIcon";
import CartDropdown from "@/components/ecommerce/CartDropdown";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HomeIcon, PowerIcon, WrenchIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { clearLoginData } from "@/redux/store/slices/authSlice";
import { useRouter } from 'next/navigation';
import SearchInput from "@/components/ecommerce/widgets/SearchInput";

// Define the duration of the CSS animation in milliseconds
const CART_ANIMATION_DURATION = 300;

const CartNav = () => {
    const { token, customer } = useSelector((state) => state.auth);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shouldRenderCart, setShouldRenderCart] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;
    const wishListCount = 0;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const router = useRouter();

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOpenCart = () => {
        // 1. Set component to render immediately
        setShouldRenderCart(true);
        // 2. Small delay to ensure DOM is ready before animation
        setTimeout(() => setIsCartOpen(true), 10);
    };

    const handleCloseCart = useCallback(() => {
        // 1. Start the slide-out animation
        setIsCartOpen(false);
        // 2. Wait for the animation to complete before removing from DOM
        setTimeout(() => {
            setShouldRenderCart(false);
        }, CART_ANIMATION_DURATION);
    }, []);

    // Effect to handle closing the cart when the Escape key is pressed
    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && isCartOpen) {
                handleCloseCart();
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [isCartOpen, handleCloseCart]);

    const handleLogout = () => {
        // Remove token from localStorage if you stored it there
        localStorage.removeItem('token');

        // Dispatch Redux logout
        dispatch(clearLoginData());

        // Redirect to homepage after logout
        router.replace('/');
        window.location.href = '/';
    };

    return (
        <nav className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 lg:px-6 lg:py-3">
            {/* Logo Section - Responsive */}
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/images/logo.png"
                        width={120}
                        height={60}
                        alt="Company Logo"
                        className="h-12 w-auto lg:h-16 xl:h-20 transition-all duration-200"
                        priority
                    />
                </Link>
            </div>

            {/* Search Section - Responsive */}
            <div className="w-full lg:w-2/3 xl:w-1/2 flex-1 max-w-2xl">
                <div className="flex items-center rounded-md w-full px-3 py-2">
                    <SearchInput />
                </div>
            </div>

            {/* Icons Section - Responsive */}
            <div className="w-full lg:w-auto">
                <div className="flex items-center justify-between lg:justify-end lg:space-x-6 text-gray-700 font-medium">
                    {/* Wishlist */}
                    <div className="hover:text-red-600 flex items-center relative group">
                        <div className="relative">
                            <WishListIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-red-600 transition-colors"/>
                            {wishListCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                                    {wishListCount}
                                </span>
                            )}
                        </div>
                        <span className="ml-2 hidden sm:block text-sm lg:text-base">Wishlist</span>
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <div
                            className="hover:text-red-600 flex items-center relative group cursor-pointer"
                            onClick={handleOpenCart}
                        >
                            <div className="relative">
                                <CartIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-red-600 transition-colors"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="ml-2 hidden sm:block text-sm lg:text-base">Cart</span>
                        </div>
                    </div>

                    {/* Full Screen Modal with Synchronized Animations */}
                    {shouldRenderCart && (
                        <div
                            className={`fixed inset-0 z-50 ${
                                isCartOpen ? 'opacity-100' : 'opacity-0'
                            } transition-opacity duration-300 ease-out`}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                pointerEvents: isCartOpen ? 'auto' : 'none'
                            }}
                            onClick={handleCloseCart}
                        >
                            {/* Cart Panel - Full height, flush with right edge, no white space */}
                            <div
                                className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-50 transform ${
                                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
                                } transition-transform duration-300 ease-out overflow-hidden sm:pl-[65px]`}
                                style={{
                                    height: '100vh', // Full viewport height
                                    maxHeight: '100vh', // Prevent overflow
                                    margin: 0, // Remove any default margins
                                    border: 'none', // Remove any borders
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <CartDropdown onClose={handleCloseCart}/>
                            </div>
                        </div>
                    )}

                    {/* Account */}
                    <div className="relative flex items-center group" ref={dropdownRef}>
                        {!customer ? (
                            <Link
                                href="/auth/login"
                                className="hover:text-red-600 flex items-center transition-colors"
                            >
                                <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600"/>
                                <span className="ml-2 hidden sm:block text-sm lg:text-base">Login</span>
                            </Link>
                        ) : (
                            <>
                                <div
                                    onClick={toggleDropdown}
                                    className="flex items-center cursor-pointer group"
                                >
                                    <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-red-700 transition-colors"/>
                                    <button className="hover:text-red-600 flex items-center">
                                        <span className="ml-2 hidden sm:block text-sm lg:text-base">Account</span>
                                    </button>
                                </div>

                                {isOpen && (
                                    <div
                                        className="absolute right-0 mt-2 lg:mt-[150px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                        <div
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <HomeIcon className="h-4 w-4 mr-3"/>
                                            <Link
                                                href="/user/dashboard"
                                                className="text-gray-600 hover:text-blue-600 font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>

                                        <div
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <UserIcon className="h-4 w-4 mr-3"/>
                                            Profile
                                        </div>

                                        <div className="border-t border-gray-100 my-1"></div>

                                        <div
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <PowerIcon className="h-4 w-4 mr-3"/>
                                            Logout
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CartNav;