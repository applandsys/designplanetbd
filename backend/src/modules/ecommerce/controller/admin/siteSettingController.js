require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('@/middleware/siteLogoUpload');

const siteSetting = async (req, res) => {
    try {
        const {
            site_name,
            description,
            address,
            phone,
            email,
            whatsapp,
            default_currency,
        } = req.body;

        const existingSetting = await prisma.siteSetting.findFirst();

        if (!existingSetting) {
            return res.status(404).json({
                success: false,
                message: 'Site settings not seeded',
            });
        }

        let logoPath;
        if (req.files?.logo?.length > 0) {
            logoPath = `/images/logo/${req.files.logo[0].filename}`;
        }

        const updated = await prisma.siteSetting.update({
            where: { id: existingSetting.id },
            data: {
                site_name,
                description,
                address,
                phone,
                email,
                whatsapp,
                default_currency: Number(default_currency),
                ...(logoPath && { logo: logoPath }),
            },
        });

        res.json({
            success: true,
            data: updated,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};


const getSiteSetting = async (req, res) => {
    try {
        const setting = await prisma.siteSetting.findFirst();

        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'Site settings not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: setting,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};


const handler = async (req, res) => {
    const { id } = req.params;  // This is for the `PUT` method (existing banner update)

    switch (req.method) {
        case 'GET':
            try{
                const banner = await prisma.banner.findMany();
                return res.status(200).json({
                    success: true,
                    data: banner,
                })
            } catch (error){
                res.status(500).json({success: false});
            }
        case 'POST':
            // Handle POST method for creating a new banner
            try {
                const {
                    name,
                    title,  // title should be title_text in Prisma model
                    sub_title,  // sub_title should be mapped to sub_text
                    slug,
                    background_color,  // background_color should be backgroundColor in Prisma model
                    position,
                    height,
                    width,
                    url,
                    url_text
                } = req.body;

                // Handle image upload for new banner
                let imageName = null;
                if (req.files?.banner?.length > 0) {
                    imageName = req.files.banner[0].filename;
                }

                // Create a new banner entry in the database
                const newBanner = await prisma.banner.create({
                    data: {
                        name,
                        title_text: title,        // Corrected field name (title_text)
                        sub_text: sub_title,  // Corrected to match Prisma model (sub_text)
                        slug,
                        backgroundColor: background_color,  // Corrected to match Prisma model (backgroundColor)
                        position,
                        image: imageName,  // Image filename from uploaded file
                        height,
                        width,
                        url,
                        url_text,
                    },
                });

                // Respond with the created banner data
                return res.status(201).json({ success: true, data: newBanner });
            } catch (err) {
                // If there's an error, log it and return a server error response
                console.error(err);
                return res.status(500).json({ success: false, error: err.message });
            }

        case 'PUT':
            // Handle PUT method for updating an existing banner
            try {
                const { name, title_text, sub_title, slug, background_color, height, width, position, url, url_text } = req.body;
                const existingBanner = await prisma.banner.findUnique({
                    where: { id: parseInt(id) },
                });

                if (!existingBanner) {
                    return res.status(404).json({ success: false, message: 'Banner not found' });
                }

                let imageName = existingBanner.image;
                if (req.files?.banner?.length > 0) {
                    imageName = req.files.banner[0].filename;
                    // Optionally delete old image if replaced
                    const oldImagePath = path.join(process.cwd(), 'public/images/banners', existingBanner.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                const updatedBanner = await prisma.banner.update({
                    where: { id: parseInt(id) },
                    data: {
                        name,
                        title_text,  // Corrected to title_text
                        sub_text: sub_title,  // Corrected to sub_text
                        slug,
                        backgroundColor: background_color,  // Corrected to backgroundColor
                        image: imageName,  // Image filename from uploaded file
                        height,
                        width,
                        position,
                        url,
                        url_text,
                    },
                });

                return res.status(200).json({ success: true, data: updatedBanner });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: err.message });
            }

        case 'DELETE':
            // Handle DELETE method for deleting a banner
            try {
                const existingBanner = await prisma.banner.findUnique({
                    where: { id: parseInt(id) },
                });

                if (!existingBanner) {
                    return res.status(404).json({ success: false, message: 'Banner not found' });
                }

                // Delete the banner image file
                const imagePath = path.join(process.cwd(), 'public/images/banners', existingBanner.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                // Delete the banner record from DB
                await prisma.banner.delete({
                    where: { id: parseInt(id) },
                });

                return res.status(200).json({ success: true, message: 'Banner deleted successfully' });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: err.message });
            }

        default:
            return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};


module.exports = {
    siteSetting,
    getSiteSetting,
    handler
};
