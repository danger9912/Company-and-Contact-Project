    const express = require('express');
    const multer = require('multer');
    const sharp = require('sharp');
    const path = require('path');
    const fs = require('fs');
    const cors = require("cors");
    const app = express();
    app.use(cors());
    const upload = multer({ dest: 'uploads/' });

    app.post('/upload-tiff', upload.single('tiff'), async (req, res) => {
        try {
            console.log("hie")
            const tiffPath = req.file.path;
            const outputPath = path.join('uploads', `${req.file.filename}.png`);

            await sharp(tiffPath)
                .png()
                .toFile(outputPath);

            // Read the converted file and send it as a response
            fs.readFile(outputPath, (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading the converted file');
                }
                res.setHeader('Content-Type', 'image/png');
                res.send(data);

                // Clean up files
                fs.unlink(tiffPath, () => {});
                fs.unlink(outputPath, () => {});
            });
        } catch (err) {
            console.error('Error converting TIFF:', err);
            res.status(500).send('Error converting TIFF');
        }
    });

    app.listen(9000, () => {
        console.log('Server running on port 9000');
    });
