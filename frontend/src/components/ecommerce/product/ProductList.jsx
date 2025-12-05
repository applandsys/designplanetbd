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
            .finally(() => setLoading(false)); // ✅ wrap in function
    }, []);

    const featuredProduct = products.filter(item=>item.isFeatured === false);

    const hotProducts = products.filter(product =>
        product.labels.some(labelObj => labelObj.label?.slug === "hot-products")
    );

    const bestSellers = products.filter(product =>
        product.labels.some(labelObj => labelObj.label?.slug === "best-sellers")
    );

    const mostPopular = products.filter(product =>
        product.labels.some(labelObj => labelObj.label?.slug === "most-popular")
    );

    if (loading) return <div className="p-4">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message || error}</div>;

    return (
        <div className=" mt-4">
            <div className="mt-4">
                <h2>Featured Products</h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProduct.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} /> // ✅ key added
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h2>Hot Products</h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {hotProducts.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} /> // ✅ key added
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h2>Most Popular</h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mostPopular.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} /> // ✅ key added
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductList;
