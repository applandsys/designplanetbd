const { PrismaClient } = require('@prisma/client');
const {getProductById, getProductAttribute, getProductBySlug} = require("../model/productModel");
const {getAllCategories, getAllBrands, insertBrand} = require("../model/categoryModel");
const prisma = new PrismaClient();

const allProducts =  async (req,res) => {
    const categories = await prisma.product.findMany();
    res.json(categories);
}

const productCategories =  async (req,res) => {
    const categories = await getAllCategories();
    res.json(categories);
}

const featuredProducts =  async (req,res) => {
    try {

        const products = await prisma.product.findMany({
            where: {
                labels: {
                    some: {}  // means at least one related label exists
                }
            },
            include: {
                images: true,
                categories: true,
                labels: {
                    include: {
                        label: true
                    },
                },
            },
        });


        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const productByCatId = async (req, res) => {
    try {
        const catId = parseInt(req.params.catid); // Ensure the catid is treated as an integer

        const products = await prisma.product.findMany({
            where: {
                categories: {
                    some: { id: catId }, // Fetch products that belong to the category with catId
                },
            },
            include: {
                images: true,
                categories: true,
                labels: {
                    include: {
                        label: true, // Include label details if needed
                    },
                },
            },
        });

        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const productBySlug =  async (req,res) => {
    try {
        const slug =  req.params.slug;

        const products = await prisma.product.findMany({
            where: {
                labels: {
                    some: {}  // means at least one related label exists
                }
            },
            include: {
                images: true,
                categories: true,
                labels: {
                    include: {
                        label: true
                    },
                },
            },
        });

        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const productDetail = async (req,res) => {

    try {
        const { slug } = req.params;

        console.log("P : ",slug);

        const product =  await getProductBySlug(slug);



        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }

        const productAttribute = await prisma.productVariant.findMany({
            where: {
                productId: product.id,
            },
            include: {
                variantAttributes: {
                    include: {
                        attributeValue: {
                            include: {
                                attribute: true,
                            },
                        },
                    },
                },
                CombinedVariantAttribute: true,
            }
        });

        const dataSet = {...product, attributes: productAttribute}
        res.json({success: true, data: dataSet});
    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const newProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: true,
                categories: true,
            },
            orderBy: {
                createdAt: 'desc', // Sorting by creation date in descending order
            },
            take: 10, // Limiting the result to 10 items
        });

        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const productAttributes = async (req, res) => {
    try {
        const productAttributes = await getProductAttribute();
        res.json({ success: true, data: productAttributes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error product Attributes' });
    }
}

const productBrands =  async (req,res) => {
    const brands = await getAllBrands();
    res.json(brands);
}

module.exports = {
    productCategories,
    featuredProducts,
    productDetail,
    newProducts,
    allProducts,
    productAttributes,
    productBrands,
    productBySlug,
    productByCatId
};


/*

 const product = await prisma.product.create({
    data: {
      name: 'Sample Product',
      description: 'This is a sample product',
      buyPrice: 50.0,
      price: 100.0,
      discountPrice: 80.0,
      point: 5.0,
      isFeatured: true,
      categories: {
        connect: [
          { id: 1 },
          { id: 2 },
        ],
      },
      images: {
        create: [
          { url: 'https://example.com/image1.jpg' },
          { url: 'https://example.com/image2.jpg' },
        ],
      },
    },
    include: {
      categories: true,
      images: true,
    },
  });


  */