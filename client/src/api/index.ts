import axios from "axios";
import crypto from "crypto";

export function updateHeaders(): ApiHeader {
  const algorithm = "aes-256-ctr";
  const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const date = new Date().toISOString();
  const encrypted = Buffer.concat([cipher.update(date), cipher.final()]);
  return { hash: encrypted.toString("hex"), iv: iv.toString("hex") };
}

const useProd = false;
export const api = axios.create({
  baseURL:
    !useProd && process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://movemints.herokuapp.com/",
});
