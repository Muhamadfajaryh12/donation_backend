const multer = require("multer");
const path = require("path");
const fs = require("fs");

const folderPath = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}
//Menyimpan File
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Menghapus File
const destroy = (filename) => {
  if (!filename) return;
  const basename = path.basename(filename);
  const filepath = path.join(__dirname, "../public/uploads", basename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

module.exports = { upload, destroy };
