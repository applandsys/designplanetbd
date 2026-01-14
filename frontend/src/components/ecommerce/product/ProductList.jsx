'use client';

import React, { useEffect, useState } from "react";
import {fetchFeaturedProducts, fetchProductsBySlug} from "@/services/ecommerce/GetProducts";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";

const ProductList = ({headLine}) => {
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetchFeaturedProducts()
            .then((data) => setFeaturedProduct(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

        fetchProductsBySlug('hot-products')
        .then((data) => setHotProducts(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));

        fetchProductsBySlug('most-popular')
            .then((data) => setMostPopular(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

    }, []);


    if (loading) return <div className="p-4">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message || error}</div>;

    return (
        <div className="mt-4">
            <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                    {featuredProduct && featuredProduct.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Hot Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                    {hotProducts && hotProducts.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Most Popular</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {mostPopular && mostPopular.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;