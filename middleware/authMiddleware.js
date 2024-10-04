import Auth from "../module/authModule.js";
import jwt from "jsonwebtoken";

const userAuthentication = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({
        message: "User Validation Failed",
        error: "User Token Missing",
      });
    }

    const token = authorization?.replace("Bearer ", "");

    let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded Tokken", decodeToken);

    const user = await Auth.findById(decodeToken.id);

    if (!user) {
      return res.status(400).json({
        message: "Validation Failed",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "User Validation Failed",
    });
  }
};

export default userAuthentication;
