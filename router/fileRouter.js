import { Router } from "express";
import userAuthentication from "../middleware/authMiddleware.js";
import {
  getAllFile,
  getFile,
  uploadFile,
} from "../controller/fileController.js";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|docx/;
    const extname = filetypes.test(
      file.originalname.split(".").pop().toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

const fileRouter = Router();

fileRouter.post(
  "/uploadFile",
  userAuthentication,
  upload.single("file"),
  uploadFile
);
fileRouter.get("/getFile/:id", userAuthentication, getFile);
fileRouter.get("/getFile", userAuthentication, getAllFile);

export default fileRouter;
