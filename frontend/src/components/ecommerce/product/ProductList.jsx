'use client';

import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "@/services/ecommerce/GetProducts";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";

const ProductList = ({headLine}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts()
            .then((data) => setProducts(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const featuredProduct = products.filter(item=>item.isFeatured === false);
    const hotProducts = products.filter(product =>
        product.labels.some(labelObj => labelObj.label?.slug === "hot-products")
    );
    const mostPopular = products.filter(product =>
        product.labels.some(labelObj => labelObj.label?.slug === "most-popular")
    );

    if (loading) return <div className="p-4">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message || error}</div>;

    return (
        <div className="mt-4">
            <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Featured Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                    {featuredProduct.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Hot Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                    {hotProducts.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-kumbh">Most Popular</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {mostPopular.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;