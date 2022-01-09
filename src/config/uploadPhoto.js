const multer = require("multer");
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
