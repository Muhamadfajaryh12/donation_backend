const multer = require("multer");
const path = require("path");
const fs = require("fs");
//Menyimpan File
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Menghapus File
const destroy = (filename) => {
  const filepath = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

module.exports = { upload, destroy };
