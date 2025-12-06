import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from "@/redux/store/slices/cartSlice";
import Link from "next/link";
import OrderList from "@/components/ecommerce/OrderList";

// --- START: Inline SVG Icons ---
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const TruckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-1.1 0-2-.9-2-2V8a2 2 0 0 1 2-2h3"/><path d="M15 18h2c1.1 0 2-.9 2-2v-4h-4"/><path d="M12 18V6"/><path d="M12 6h4l3 3-3 3h-4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);
const TicketIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6"/><path d="M22 9a3 3 0 0 0 0 6"/><path d="M10 2H6a2 2 0 0 0-2 2v2"/><path d="M14 2h4a2 2 0 0 1 2 2v2"/><path d="M18 22h4a2 2 0 0 0 2-2v-2"/><path d="M6 22H2a2 2 0 0 1-2-2v-2"/></svg>
);
// --- END: Inline SVG Icons ---

export default function CartDropdown({ onClose }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const handleLinkClick = () => {
        if (onClose) {
            onClose();
        }
    };

    const navItems = [
        { label: 'Shipping', icon: TruckIcon, onClick: () => console.log('Shipping clicked') },
        { label: 'Coupon', icon: TicketIcon, onClick: () => console.log('Coupon clicked') },
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-roboto font-bold text-gray-800 tracking-wide">Shopping Cart</h3>
                    <button
                        onClick={onClose}
                        className="group p-2 rounded-full text-gray-400 hover:bg-black transition-all duration-300 ease-in-out"
                    >
                        <XIcon className="w-5 h-5 group-hover:text-white group-hover:rotate-90 transition-all duration-300 ease-in-out" />
                    </button>
                </div>
                <div className="mt-2 flex items-start text-sm">
                    <div className="w-2 h-2 bg-black rounded-full mr-2 mt-1.5 flex-shrink-0 animate-pulse duration-1000"></div>
                    <span className="font-bold bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent animate-pulse duration-2000 delay-500 leading-tight">
                        Congratulations! You&apos;ve got free shipping!
                    </span>
                </div>
            </div>

            {/* Scrollable Content Area - ONLY Cart Items */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Cart Items */}
                <div className="p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        <OrderList />
                    )}
                </div>
            </div>

            {/* Fixed Bottom Section - Visible on all devices */}
            <div className="flex-shrink-0">
                {/* Notes Section - Hidden on mobile, visible on larger screens */}
                <div className="hidden sm:block px-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-around">
                        {navItems.map((nav) => (
                            <button
                                key={nav.label}
                                onClick={nav.onClick}
                                className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors p-2"
                            >
                                <nav.icon className="w-4 h-4 mb-1" />
                                <span className="text-xs">{nav.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary Section - Fixed on all devices */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-600">Free shipping</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Buttons - Fixed at bottom on all devices */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex flex-row gap-3">
                        <Link
                            href="/cart"
                            onClick={handleLinkClick}
                            className="text-sm bg-white text-black border-black rounded-full px-4 py-2 hover:bg-black hover:text-white border text-center transition-colors flex-1"
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/checkout"
                            onClick={handleLinkClick}
                            className="text-sm bg-black text-white rounded-full px-4 py-2 hover:bg-red-600  text-center transition-colors flex-1"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}