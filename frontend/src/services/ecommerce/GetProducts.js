import config from "@/config";

export const fetchFeaturedProducts = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/featured`);
    if (!res.ok) throw new Error('Failed to fetch Product');
    const {data} = await res.json();
    return data;
};


export const fetchProductDetail = async (productSlug) => {
    const res = await fetch(`${config.apiBaseUrl}/product/detail/${productSlug}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};

export const fetchNewProduct = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/new`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
}

export const fetchProductAttributes = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/attribute/all`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
}
