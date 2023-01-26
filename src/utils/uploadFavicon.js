const path = require("path");
const multer = require("multer");
const util = require("util");

const destination = path.join(__dirname, "../../public");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, "favicon.ico");
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/x-icon") {
      cb(null, true);
    } else {
      cb(new Error("Please use a file with type .ico, for best SEO experience"));
    }
  },
}).single("favicon");

const uploadFavicon = util.promisify(upload);
module.exports = uploadFavicon;
