"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import config from "@/config";
import Link from "next/link";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import AddWishlistIcon from "@/components/ecommerce/widgets/AddWishlistIcon";

const ProductDetailCard = ({ product }) => {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();
    const { customer } = GetCustomerData();

    const productAttributes = [];
    const colorAttributes = [];
    const orderLimit = 10;

    const [selectedAttributes, setSelectedAttributes] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    product.attributes.forEach(product => {
        product.variantAttributes.forEach(attribute => {
            if (attribute.attributeValue.attribute.name === 'Color') {
                colorAttributes.push(attribute);
            } else {
                productAttributes.push(attribute);
            }
        });
    });

    const handleSetQuantity = (type) => {
        if (type === 'increment' && orderLimit > orderQuantity) {
            setOrderQuantity(prevQuantity => prevQuantity + 1);
        }
        if (type === 'decrement' && orderQuantity !== 1) {
            setOrderQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = (product) => {
        const productToAdd = {
            id: product.id,
            productId: product.id,
            price: product.sellPrice,
            point: product.point,
            images: product.images,
            quantity: orderQuantity,
            attributeValuesIds: [selectedAttributes, selectedColor]
        };
        dispatch(addToCart(productToAdd));
        showSnackbar(`You added to cart: ${product.name}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
            {/* Mobile Layout - Stacked */}
            <div className="block lg:hidden">
                {/* Image Section */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative aspect-square w-full max-w-sm mx-auto bg-gray-50 rounded-lg overflow-hidden mb-3">
                        <Image
                            src={`${config.publicPath}/images/products/${selectedImage.name}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Image Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
                        {product.images.map((image, index) => (
                            <button
                                key={image.name}
                                onClick={() => setSelectedImage(image)}
                                className={`flex-shrink-0 w-14 h-14 border-2 rounded-md overflow-hidden ${
                                    selectedImage.name === image.name
                                        ? 'border-amber-400'
                                        : 'border-gray-200'
                                }`}
                            >
                                <Image
                                    width={56}
                                    height={56}
                                    src={`${config.publicPath}/images/products/${image.name}`}
                                    alt={image?.altText || `Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                        {product?.labels?.length ? product.labels[0].label.name : ''}
                    </span>

                    <h1 className="text-xl font-bold mt-3 text-gray-900">
                        {product.name}
                    </h1>

                    <div className="flex items-center mt-2">
                        <div className={`text-sm ${
                            product?.ratings.length > 0 ? 'text-yellow-500' : 'text-gray-300'
                        }`}>
                            {'★'.repeat(5)}
                        </div>
                        <span className="text-gray-500 text-xs ml-2">
                            ({product?.ratings.length} reviews)
                        </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <span className="text-2xl text-green-600 font-bold">
                            ৳ {product.sellPrice}
                        </span>
                        {product.discount > 0 && (
                            <>
                                <div className="text-xs text-red-400 font-semibold">
                                    {product.discount}% Off
                                </div>
                                <span className="line-through text-gray-400 text-base">
                                    ৳ {product.price}
                                </span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                        {product.shortDescription}
                    </p>

                    {/* Attributes */}
                    {productAttributes.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size:</h3>
                            <div className="flex flex-wrap gap-2">
                                {productAttributes.map((productAttribute) => (
                                    <button
                                        key={productAttribute.attributeValue.id}
                                        className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                                            productAttribute.attributeValue.id === selectedAttributes
                                                ? 'bg-amber-400 border-amber-400 text-white'
                                                : 'border-gray-300 text-gray-700'
                                        }`}
                                        onClick={() => setSelectedAttributes(productAttribute.attributeValue.id)}
                                    >
                                        {productAttribute.attributeValue.codeNumber}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color Attributes */}
                    {colorAttributes.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Color:</h3>
                            <div className="flex flex-wrap gap-3">
                                {colorAttributes.map((colorAttribute) => (
                                    <button
                                        key={colorAttribute.attributeValue.id}
                                        onClick={() => setSelectedColor(colorAttribute.attributeValue.id)}
                                        className={`p-1 rounded-full ${
                                            colorAttribute.attributeValue.id === selectedColor
                                                ? 'ring-2 ring-gray-400 ring-offset-2'
                                                : 'border border-gray-200'
                                        }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: colorAttribute.attributeValue.codeNumber }}
                                        ></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity & Add to Cart */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                <button
                                    onClick={() => handleSetQuantity('decrement')}
                                    className="w-6 h-6 flex items-center justify-center text-gray-600"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={orderQuantity}
                                    readOnly
                                    className="w-8 text-center border-none outline-none bg-transparent font-medium"
                                />
                                <button
                                    onClick={() => handleSetQuantity('increment')}
                                    className="w-6 h-6 flex items-center justify-center text-gray-600"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex items-center justify-center bg-green-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex-1"
                            >
                                <CartIcon className="w-5 h-5 mr-2" />
                                Add to cart
                            </button>
                            {customer && (
                                <div className="flex-shrink-0">
                                    <AddWishlistIcon customer={customer} product={product} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 p-6">
                {/* Image Section */}
                <div className="p-2 border border-gray-300 rounded-md">
                    <div className="relative aspect-square w-full bg-gray-50 rounded-lg overflow-hidden mb-3">
                        <Image
                            src={`${config.publicPath}/images/products/${selectedImage.name}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
                        {product.images.map((image, index) => (
                            <button
                                key={image.name}
                                onClick={() => setSelectedImage(image)}
                                className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden ${
                                    selectedImage.name === image.name
                                        ? 'border-amber-400'
                                        : 'border-gray-200'
                                }`}
                            >
                                <Image
                                    width={64}
                                    height={64}
                                    src={`${config.publicPath}/images/products/${image.name}`}
                                    alt={image?.altText || `Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                    <span className="bg-pink-100 text-pink-600 text-sm font-semibold px-2 py-1 rounded">
                        {product?.labels?.length ? product.labels[0].label.name : ''}
                    </span>

                    <h1 className="text-2xl font-bold text-gray-900">
                        {product.name}
                    </h1>

                    <div className="flex items-center">
                        <div className={`text-sm ${
                            product?.ratings.length > 0 ? 'text-yellow-500' : 'text-gray-300'
                        }`}>
                            {'★'.repeat(5)}
                        </div>
                        <span className="text-gray-500 text-sm ml-2">
                            ({product?.ratings.length} reviews)
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl text-green-600 font-bold">
                            ৳ {product.sellPrice}
                        </span>
                        {product.discount > 0 && (
                            <>
                                <div className="text-sm text-red-400 font-semibold">
                                    {product.discount}% Off
                                </div>
                                <span className="line-through text-gray-400 text-lg">
                                    ৳ {product.price}
                                </span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        {product.shortDescription}
                    </p>

                    {/* Attributes */}
                    {productAttributes.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size:</h3>
                            <div className="flex flex-wrap gap-2">
                                {productAttributes.map((productAttribute) => (
                                    <button
                                        key={productAttribute.attributeValue.id}
                                        className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                                            productAttribute.attributeValue.id === selectedAttributes
                                                ? 'bg-amber-400 border-amber-400 text-white'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                        onClick={() => setSelectedAttributes(productAttribute.attributeValue.id)}
                                    >
                                        {productAttribute.attributeValue.codeNumber}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color Attributes */}
                    {colorAttributes.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Color:</h3>
                            <div className="flex flex-wrap gap-3">
                                {colorAttributes.map((colorAttribute) => (
                                    <button
                                        key={colorAttribute.attributeValue.id}
                                        onClick={() => setSelectedColor(colorAttribute.attributeValue.id)}
                                        className={`p-1 rounded-full ${
                                            colorAttribute.attributeValue.id === selectedColor
                                                ? 'ring-2 ring-gray-400 ring-offset-2'
                                                : 'border border-gray-200'
                                        }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full cursor-pointer transition-shadow"
                                            style={{ backgroundColor: colorAttribute.attributeValue.codeNumber }}
                                        ></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <button
                                onClick={() => handleSetQuantity('decrement')}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={orderQuantity}
                                readOnly
                                className="w-12 text-center border-none outline-none bg-transparent font-medium"
                            />
                            <button
                                onClick={() => handleSetQuantity('increment')}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex gap-3 flex-1">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex items-center justify-center bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex-1"
                            >
                                <CartIcon className="w-5 h-5 mr-2" />
                                Add to cart
                            </button>
                            {customer && (
                                <AddWishlistIcon customer={customer} product={product} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailCard;