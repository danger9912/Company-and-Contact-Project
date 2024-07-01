const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
const xlsx = require('xlsx');
const generalDetailsServices = require("./Services/generalServices");
const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.post('/upload_file', upload.single('excelFile'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
        console.log("hi")
        const file = req.file;
        const fileSizeInBytes = file.size;
        const fileExtension = file.originalname.split(".").pop();
        const acceptable = true
        if (acceptable) {
          const corrupted = false;
          if (corrupted) {
            res.status(400).json({ message: "File is potentially corrupted" });
          } else {
            const result = await generalDetailsServices.handleData(
              file,
              file.originalname
            );
            res.status(201).json(result);
          }
        }
      } catch (err) {
        // console.error(err);
        // next(err);
      }
});

app.post('/api/fieldnames', async (req, res) => {
    try {
        const filename = req.body.filename;
        const filepath = path.join(__dirname, 'uploads', filename);
        const rawData = await fs.readFile(filepath, 'utf8');
        const data = JSON.parse(rawData);

        res.send({ field_names: Object.keys(data[0]) });
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Error reading file.' });
    }
});

app.get('/api/view/:name', async (req, res, next) => {
    try {
        const filename = req.params.name;

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required in the request body.' });
        }

        const filePath = path.join(__dirname, 'uploads', filename);
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        res.status(200).json({ file_data: jsonData });
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        next(error);
    }
});

app.get('/', (req, res) => {
    res.status(200).send('API works successfully');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
