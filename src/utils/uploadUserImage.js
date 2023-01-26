const path = require("path");
const multer = require("multer");
const util = require("util");

const destination = path.join(__dirname, "../../public/content/images/users");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const filetype = file.mimetype.split("/")[1];
      cb(null, `${req.user_id}-profile.${filetype}`);
    },
  }),
}).single("images");

const uploadUserImage = util.promisify(upload);
module.exports = uploadUserImage;
