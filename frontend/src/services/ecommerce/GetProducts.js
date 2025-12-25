import config from "@/config";

export const fetchFeaturedProducts = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/featured`);
    if (!res.ok) throw new Error('Failed to fetch Product');
    const {data} = await res.json();
    return data;
};

export const fetchProductByCatId= async (canId) => {
    const res = await fetch(`${config.apiBaseUrl}/product/list/${canId}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};


export const fetchProductDetail = async (id) => {
    const res = await fetch(`${config.apiBaseUrl}/product/detail/${id}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};

export const fetchProductBySlug= async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/product/list/${slug}`, {
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
