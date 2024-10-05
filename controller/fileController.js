import File from "../module/fileModel.js";

const uploadFile = async (req, res) => {
  const file = req.file;

  // Check if no file is uploaded
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Convert file to base64
    const base64Data = file.buffer.toString("base64");

    // Extract file extension
    const extension = file.originalname.split(".").pop().toLowerCase();
    let fileType;

    // Validate file type
    if (extension === "pdf") {
      fileType = "pdf";
    } else if (extension === "docx") {
      fileType = "docx";
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Create a new File document (replace with actual database logic)
    const newFile = await File.create({
      user: req.user._id, // Assuming the user is authenticated
      filename: file.originalname,
      fileType,
      data: base64Data,
    });

    // Send success response
    return res.status(201).json({
      message: "File uploaded successfully",
      file: {
        id: newFile._id,
        filename: newFile.filename,
        fileType: newFile.fileType,
        uploadedAt: newFile.uploadedAt,
      },
    });
  } catch (error) {
    // Handle server error
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// getFile
const getFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findOne({ _id: fileId, user: req.user._id });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({
      id: file._id,
      filename: file.filename,
      fileType: file.fileType,
      data: file.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// getAllFile
const getAllFile = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id }).select("-data");

    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { uploadFile, getFile, getAllFile };
