import jwt from "jsonwebtoken";
export async function Generate(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}
