import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from "@/redux/store/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";

export default function OrderList() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    /*
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    */

    return (
        <>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map((product) => (
                        <div key={product.productId} className="flex items-center justify-between mb-4">
                            {product.images.length > 0 && ( <Image width={100} height={100} src={`${config.publicPath}/images/products/${product.images[0].name}`} alt={product.images[0].altText} className="w-12 h-12 rounded" />)}
                            <div className="flex-1 ml-3">
                                <p className="text-xs font-inter font-semibold text-gray-800">{product.name}</p>
                                <p className="text-xs font-roboto text-gray-600">{product.quantity} × ${(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent dropdown from closing
                                    handleRemove(product.id);
                                }}
                                className="text-gray-500 hover:text-red-500"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <hr className="my-2" />
                    <div className="flex justify-between font-sans font-semibold tracking-wide">
                        <span className="text-gray-800">Sub total</span>
                        <span className="text-red-600">${total.toFixed(2)}</span>
                    </div>
                </>
            )}
        </>
    );
}
