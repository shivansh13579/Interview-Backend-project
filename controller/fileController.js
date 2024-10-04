import File from "../module/fileModel.js";

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64File = file.buffer.toString("base64");

    const newFile = new File({
      filename: file.originalname,
      contentType: file.mimetype,
      base64Data: base64File,
    });

    await newFile.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      fileId: newFile._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// getFile
const getFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(200).json({
      filename: file.filename,
      contentType: file.contentType,
      base64Data: file.base64Data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// getAllFile
const getAllFile = async (req, res) => {
  try {
    const files = await File.find();

    if (files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }

    return res.status(200).json({ files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { uploadFile, getFile, getAllFile };
