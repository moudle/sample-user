import jwt from "jsonwebtoken";
import { User } from "./db";
import { CONFIG_API_USER } from "./config-api";

export function signJWT(data: any) {
  return jwt.sign(data, CONFIG_API_USER.jwt_secret_key);
}

export async function extractJWT<T = string>(token: string) {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(
      token,
      CONFIG_API_USER.jwt_secret_key,
      async (err: any, data: any) => {
        if (err) {
          reject(err.toString());
        }
        resolve(data);
      }
    );
  });
}

export async function getUserFromAuthHeader(authorization: string): Promise<User> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const id = await extractJWT(token);
  if (!id && isNaN(parseInt(id))) {
    throw new Error(`jwt tidak valid: ${token}`);
  }

  const user: User | null = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!user) {
    throw new Error(`data user id = ${id} tidak ditemukan.`);
  }
  return user;
}
