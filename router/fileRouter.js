import { Router } from "express";
import userAuthentication from "../middleware/authMiddleware.js";
import {
  getAllFile,
  getFile,
  uploadFile,
} from "../controller/fileController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
