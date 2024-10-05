import Auth from "../module/authModule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await Auth.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Auth({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(202).json({
      message: "User Registered Successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await Auth.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User Not Exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is not Match" });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const userResponse = existUser.toObject();
    delete userResponse.password;

    return res
      .status(202)
      .json({ message: "User Login Successfully", user: userResponse, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server errror", error: error.message });
  }
};

export { userRegister, userLogin };
