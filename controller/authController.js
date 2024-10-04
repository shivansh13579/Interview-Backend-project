import Auth from "../module/authModule.js";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  try {
    const existUser = await Auth.findOne({ email: req.body.email });

    if (existUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const user = await Auth.create(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await user.save();

    return res
      .status(202)
      .json({ message: "User Register Successfully", body: user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server errror", error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const existUser = await Auth.findOne({ email: req.body.email });

    if (!existUser) {
      return res.status(400).json({ message: "User Not Exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    return res
      .status(202)
      .json({ message: "User Login Successfully", body: user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server errror", error: error.message });
  }
};

// const userLogout = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "");
//     const expiry = jwt.decode(token).exp * 1000;

//     // Store the token in the blacklist
//     await Auth.create({ token, expiry });

//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

export { userRegister, userLogin };
