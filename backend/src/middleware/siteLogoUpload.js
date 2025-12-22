// backend/src/middleware/siteLogoUpload.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), 'public/images/logo');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const cleanName = file.originalname
            .toLowerCase()
            .replace(/\s+/g, '-')       // replace spaces with -
            .replace(/[^a-z0-9.-]/g, ''); // remove special chars (safe)

        const uniqueName = Date.now() + '-' + cleanName;
        cb(null, uniqueName);
    }
});

const siteLogo = multer({ storage });

module.exports = siteLogo;
