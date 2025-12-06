"use client";

import React, { useState, useRef } from 'react';
import Image from "next/image";
import config from "@/config";
import Link from "next/link";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { GetCustomerData } from "@/services/ecommerce/GetReduxData";
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
    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);
    const lastTouchRef = useRef({ x: 0, y: 0 });

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

    const getZoomScale = () => {
        return zoomLevel;
    };

    const getMaxMovement = () => {
        if (zoomLevel === 1) return { maxX: 0, maxY: 0 };
        const movement = (zoomLevel - 1) * 50;
        return { maxX: movement, maxY: movement };
    };

    const handleZoomClick = () => {
        if (zoomLevel === 3) {
            setZoomLevel(1);
            setPosition({ x: 0, y: 0 });
        } else {
            setZoomLevel(zoomLevel + 1);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleTouchStart = (e) => {
        if (zoomLevel === 1) return;
        setIsDragging(true);
        const touch = e.touches[0];
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        if (!isDragging || zoomLevel === 1) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouchRef.current.x;
        const deltaY = touch.clientY - lastTouchRef.current.y;
        const { maxX, maxY } = getMaxMovement();

        setPosition(prev => {
            const newX = Math.max(Math.min(prev.x + deltaX, maxX), -maxX);
            const newY = Math.max(Math.min(prev.y + deltaY, maxY), -maxY);
            return { x: newX, y: newY };
        });

        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleMouseDown = (e) => {
        if (zoomLevel === 1) return;
        setIsDragging(true);
        lastTouchRef.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || zoomLevel === 1) return;
        const deltaX = e.clientX - lastTouchRef.current.x;
        const deltaY = e.clientY - lastTouchRef.current.y;
        const { maxX, maxY } = getMaxMovement();

        setPosition(prev => {
            const newX = Math.max(Math.min(prev.x + deltaX, maxX), -maxX);
            const newY = Math.max(Math.min(prev.y + deltaY, maxY), -maxY);
            return { x: newX, y: newY };
        });

        lastTouchRef.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const getZoomHint = () => {
        switch(zoomLevel) {
            case 1: return "Tap to Zoom";
            case 2: return "Zoom 2x - Drag to move";
            case 3: return "Zoom 3x - Drag to move";
            default: return "Tap to Zoom";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
            {/* Mobile Layout */}
            <div className="block lg:hidden">
                <div className="p-4 border-b border-gray-100">
                    {/* Image Container with zoom functionality */}
                    <div
                        ref={containerRef}
                        className="relative w-full max-w-sm mx-auto bg-white rounded-xl overflow-hidden mb-3 select-none"
                        style={{
                            height: '500px',
                            touchAction: zoomLevel === 1 ? 'pan-y' : 'none',
                            WebkitUserSelect: 'none',
                            userSelect: 'none'
                        }}
                        onClick={handleZoomClick}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                transform: `scale(${getZoomScale()}) translate(${position.x}px, ${position.y}px)`,
                                transition: isDragging ? 'none' : 'transform 0.2s ease',
                            }}
                        >
                            <Image
                                src={`${config.publicPath}/images/products/${selectedImage.name}`}
                                alt={product.name}
                                fill
                                className="rounded-xl"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center center',
                                }}
                                priority
                                draggable={false}
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-[10px] px-2 py-1 rounded-full">
                            {getZoomHint()}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto py-2">
                        {product.images.map((image, index) => (
                            <button
                                key={image.name}
                                onClick={() => {
                                    setSelectedImage(image);
                                    setZoomLevel(1);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className={`flex-shrink-0 w-14 h-14 border-2 rounded-lg overflow-hidden ${
                                    selectedImage.name === image.name
                                        ? 'border-amber-400'
                                        : 'border-gray-200'
                                }`}
                            >
                                <Image
                                    width={56}
                                    height={56}
                                    src={`${config.publicPath}/images/products/${image.name}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info - From old code */}
                <div className="p-4">
                    <span className="bg-pink-100 text-pink-600 text-sm font-semibold px-2 py-1 rounded">
                        {product?.labels?.length ? product.labels[0].label.name : ''}
                    </span>

                    <h1 className="text-3xl font-bold mt-4 leading-snug">
                        {product.name}
                    </h1>

                    <div className="flex items-center mt-2">
                        {product?.ratings.length > 0 ? (
                            <div className="text-yellow-500 text-sm">
                                {'★'.repeat(5)}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm">
                                {'★'.repeat(5)}
                            </div>
                        )}
                        <span className="text-gray-500 text-sm ml-2">({product?.ratings.length} reviews)</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-4xl text-green-600 font-bold">৳ {product.sellPrice}</span>
                        {product.discount > 0 && (
                            <>
                                <div className="text-sm text-red-400 font-semibold">{product.discount}% Off</div>
                                <span className="line-through text-gray-400 text-lg">৳ {product.price}</span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                        {product.shortDescription}
                    </p>

                    {productAttributes.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size:</h3>
                            <div className="flex flex-wrap gap-2">
                                {productAttributes.map((productAttribute) => (
                                    <button
                                        key={productAttribute.attributeValue.id}
                                        className={`px-3 py-2 border rounded-lg text-sm ${
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

                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <button
                                onClick={() => handleSetQuantity('decrement')}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
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
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 flex-1"
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

                    {/* Tags section from old code */}
                    <div className="mt-6">
                        <ul className="text-xs">
                            <li className="mb-1">Tags: <Link href="/">Natural</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 p-6">
                {/* Left side - Images with zoom */}
                <div className="p-2 border border-gray-300 rounded-lg">
                    <div
                        ref={containerRef}
                        className="relative w-full bg-white rounded-xl overflow-hidden mb-3 select-none"
                        style={{
                            height: '600px',
                            touchAction: 'none'
                        }}
                        onClick={handleZoomClick}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                transform: `scale(${getZoomScale()}) translate(${position.x}px, ${position.y}px)`,
                                transition: isDragging ? 'none' : 'transform 0.2s ease',
                            }}
                        >
                            <Image
                                src={`${config.publicPath}/images/products/${selectedImage.name}`}
                                alt={product.name}
                                fill
                                className="rounded-xl"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center center',
                                }}
                                draggable={false}
                            />
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded-full">
                            {getZoomHint()}
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto py-2">
                        {product.images.map((image, index) => (
                            <button
                                key={image.name}
                                onClick={() => {
                                    setSelectedImage(image);
                                    setZoomLevel(1);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                                    selectedImage.name === image.name
                                        ? 'border-amber-400'
                                        : 'border-gray-200'
                                }`}
                            >
                                <Image
                                    width={64}
                                    height={64}
                                    src={`${config.publicPath}/images/products/${image.name}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right side - Product specifications and details */}
                <div className="space-y-6">
                    <span className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded">
                        {product?.labels?.length ? product.labels[0].label.name : ''}
                    </span>

                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center">
                        {product?.ratings.length > 0 ? (
                            <div className="text-yellow-500 text-lg">
                                {'★'.repeat(5)}
                            </div>
                        ) : (
                            <div className="text-gray-300 text-lg">
                                {'★'.repeat(5)}
                            </div>
                        )}
                        <span className="text-gray-500 text-sm ml-3">({product?.ratings.length} reviews)</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-5xl text-green-600 font-bold">৳ {product.sellPrice}</span>
                        {product.discount > 0 && (
                            <>
                                <div className="text-base text-red-400 font-semibold">{product.discount}% Off</div>
                                <span className="line-through text-gray-400 text-xl">৳ {product.price}</span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {product.shortDescription}
                    </p>

                    {productAttributes.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Size:</h3>
                            <div className="flex flex-wrap gap-3">
                                {productAttributes.map((productAttribute) => (
                                    <button
                                        key={productAttribute.attributeValue.id}
                                        className={`px-4 py-3 border-2 rounded-lg text-base font-medium transition-all ${
                                            productAttribute.attributeValue.id === selectedAttributes
                                                ? 'bg-amber-400 border-amber-400 text-white shadow-md'
                                                : 'border-gray-300 text-gray-700 hover:border-amber-300'
                                        }`}
                                        onClick={() => setSelectedAttributes(productAttribute.attributeValue.id)}
                                    >
                                        {productAttribute.attributeValue.codeNumber}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {colorAttributes.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Color:</h3>
                            <div className="flex flex-wrap gap-4">
                                {colorAttributes.map((colorAttribute) => (
                                    <button
                                        key={colorAttribute.attributeValue.id}
                                        onClick={() => setSelectedColor(colorAttribute.attributeValue.id)}
                                        className={`p-2 rounded-full transition-all ${
                                            colorAttribute.attributeValue.id === selectedColor
                                                ? 'ring-3 ring-gray-500 ring-offset-2 scale-110'
                                                : 'border border-gray-300 hover:scale-105'
                                        }`}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full shadow-sm"
                                            style={{ backgroundColor: colorAttribute.attributeValue.codeNumber }}
                                        ></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-gray-300 rounded-xl px-4 py-3">
                            <button
                                onClick={() => handleSetQuantity('decrement')}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-xl font-bold"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={orderQuantity}
                                readOnly
                                className="w-12 text-center border-none outline-none bg-transparent font-bold text-lg"
                            />
                            <button
                                onClick={() => handleSetQuantity('increment')}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-xl font-bold"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-500 transition-all shadow-lg hover:shadow-xl flex-1"
                        >
                            <CartIcon className="w-6 h-6 mr-3" />
                            Add to cart
                        </button>
                        {customer && (
                            <div className="flex-shrink-0">
                                <AddWishlistIcon customer={customer} product={product} />
                            </div>
                        )}
                    </div>

                    {/* Tags section */}
                    <div className="pt-4 border-t border-gray-200">
                        <ul className="text-sm text-gray-600">
                            <li>Tags: <Link href="/" className="text-blue-600 hover:underline">Natural</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailCard;