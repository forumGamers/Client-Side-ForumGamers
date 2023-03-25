import { JwtPayload, Secret, verify, sign } from "jsonwebtoken";
export const SECRET: Secret = process.env.SECRET as Secret;

export const createToken = (payload: object): string => sign(payload, SECRET);

export const verifyToken = (token: string | any): JwtPayload =>
  verify(token, SECRET) as JwtPayload;
