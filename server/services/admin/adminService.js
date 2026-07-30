import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";

export const login = async ({ email, password }) => {
  if (
    email !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new AppError("Invalid Credentials", 401);
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return token;
};
