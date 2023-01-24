const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const util = require("util");

const month = ("0" + (new Date().getMonth() + 1)).slice(-2).toString();
const year = new Date().getFullYear().toString();

const imageFolderByYear = path.join(__dirname, `../../public/content/images/${year}`);
const imageFolderByMonth = path.join(__dirname, `../../public/content/images/${year}/${month}`);

if (!fs.existsSync(imageFolderByYear)) {
  fs.mkdirSync(imageFolderByYear);
}

if (!fs.existsSync(imageFolderByMonth)) {
  fs.mkdirSync(imageFolderByMonth);
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imageFolderByMonth);
    },
    filename: (req, file, cb) => {
      const user_id = req.user_id.toString();
      const fileHash = crypto.randomBytes(4).toString("hex");
      const fileName = user_id.substring(0, 4) + fileHash + user_id.substring(4, 8) + "-" + file.originalname;

      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
      cb(null, true);
    } else {
      return cb(new Error("Sorry, you are not allowed to upload this file type for images"));
    }
  },
}).single("images");

const uploadImage = util.promisify(upload);
module.exports = uploadImage;
