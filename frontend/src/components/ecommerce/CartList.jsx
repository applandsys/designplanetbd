"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, updateItemQuantity } from "@/redux/store/slices/cartSlice";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/16/solid";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Image from "next/image";
import React from "react";
import config from "@/config";

const CartList = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.length;

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ).toFixed(2);

    const dispatch = useDispatch();

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleChangeQuantity = (item, newQty) => {
        const quantity = parseInt(newQty, 10);
        if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
            dispatch(updateItemQuantity({ id: item.id, quantity }));
        } else {
            console.log("Invalid quantity, please enter a value between 1 and 10.");
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold font-quicksand">Your Cart</h1>

            <div className="text-gray-500 flex justify-between w-full">
                <div className="text-xs font-light text-gray-600 tracking-wide">
                    There {totalItems === 1 ? "is" : "are"} {totalItems}{" "}
                    {totalItems === 1 ? "product" : "products"} in your cart, totaling $
                    {subtotal}
                </div>
                <button
                    onClick={() => dispatch(clearCart())}
                    className="text-xs flex items-center gap-1  hover:text-red-800 transition-colors" style={{ color: '#a52a2a' }}
                >
                    Clear Cart <TrashIcon className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-4">
                {/* Cart Items - UPDATED IMAGE SIZE AND QUANTITY BUTTONS */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-4">
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <table className="min-w-full table-auto">
                            <thead>
                            <tr className="border-b">
                                <th className="px-2 py-2 text-left">Product</th>
                                <th className="px-2 py-2 text-center">Unit Price</th>
                                <th className="px-2 py-2 text-center">Quantity</th>
                                <th className="px-2 py-2 text-center">Subtotal</th>
                                <th className="px-2 py-2 text-center">Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-2 py-2 flex items-center gap-4">
                                        {item.images.length > 0 && (
                                            <div className="w-24 h-24 bg-white border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden">
                                                <Image
                                                    width={96}
                                                    height={96}
                                                    src={`${config.publicPath}/images/products/${item.images[0].name}`}
                                                    alt={item.images[0].altText}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-gray-800 break-words max-w-[200px]">
                                            {item.name}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 text-center">${item.price.toFixed(2)}</td>
                                    <td className="px-2 py-2 text-center">
                                        {/* UPDATED OVAL-SHAPED QUANTITY BUTTONS */}
                                        <div className="flex items-center justify-center min-w-[140px]">
                                            <button
                                                onClick={() => handleChangeQuantity(item, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="text-gray-700 font-medium text-lg">−</span>
                                            </button>
                                            <input
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChangeQuantity(item, e.target.value)}
                                                type="number"
                                                min="1"
                                                max="10"
                                                step="1"
                                                className="w-14 h-10 border-y border-gray-300 text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={() => handleChangeQuantity(item, item.quantity + 1)}
                                                disabled={item.quantity >= 10}
                                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="text-gray-700 font-medium text-lg">+</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 text-center font-medium text-black">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="hover:text-red-800 font-semibold transition-colors"
                                            style={{ color: '#a52a2a' }}
                                        >
                                            <TrashIcon className="h-4 w-4" style={{ color: '#a52a2a' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View - UPDATED IMAGE SIZE AND QUANTITY BUTTONS */}
                    <div className="md:hidden space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 bg-white">
                                <div className="flex gap-4">
                                    {item.images.length > 0 && (
                                        <div className="w-28 h-28 bg-white border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <Image
                                                width={112}
                                                height={112}
                                                src={`${config.publicPath}/images/products/${item.images[0].name}`}
                                                alt={item.images[0].altText}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-800 text-sm break-words leading-tight">
                                            {item.name}
                                        </h3>
                                        <p className="text-green-600 font-semibold mt-2 text-base">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    {/* UPDATED OVAL-SHAPED QUANTITY BUTTONS FOR MOBILE */}
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="text-gray-700 font-medium text-lg">−</span>
                                        </button>
                                        <input
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleChangeQuantity(item, e.target.value)}
                                            type="number"
                                            min="1"
                                            max="10"
                                            className="w-14 h-10 border-y border-gray-300 text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity + 1)}
                                            disabled={item.quantity >= 10}
                                            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="text-gray-700 font-medium text-lg">+</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-green-600 text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="hover:text-red-800 transition-colors"
                                            style={{ color: '#a52a2a' }}
                                        >
                                            <TrashIcon className="h-5 w-5" style={{ color: '#a52a2a' }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <a
                            href="/"
                            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 font-medium text-sm"
                        >
                            <ArrowLeftIcon className="h-4 w-4 text-white mr-2" />
                            Continue Shopping
                        </a>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 h-fit">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="text-sm border-b pb-3 mb-3">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-900 font-medium">Subtotal</span>
                            <span className="font-medium" style={{ color: '#a52a2a' }}>${subtotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span style={{ color: '#a52a2a' }} className="font-medium">Shipping</span>
                            <span className="text-gray-500 font-light italic tracking-wide">Calculated at checkout</span>
                        </div>
                        <div className="ml-4 text-xs">
                            <div className="flex justify-between mb-1 border-l-2 pl-2" style={{ borderColor: '#a52a2a' }}>
                                <span className="font-light text-gray-700">Inside Dhaka</span>
                                <span className="font-medium text-[#a52a2a]">৳60</span>
                            </div>
                            <div className="flex justify-between mb-1 border-l-2 pl-2" style={{ borderColor: '#a52a2a' }}>
                                <span className="font-light text-gray-700">Outside Dhaka</span>
                                <span className="font-medium text-[#a52a2a]">৳100</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total</span>
                        <span className="text-[#a52a2a]">${subtotal}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <a
                            href="/checkout"
                            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 font-medium text-sm"
                        >
                            <ArrowLeftIcon className="h-4 w-4 text-white mr-2" />
                            Proceed to Checkout
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartList;