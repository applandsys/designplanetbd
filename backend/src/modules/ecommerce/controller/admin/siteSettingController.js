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


module.exports = {
    siteSetting,
    getSiteSetting
};
