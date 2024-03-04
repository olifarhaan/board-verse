import { NextFunction, Request, Response } from "express";
import jwtmod from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null || token === undefined)
    return res
      .status(401)
      .json({ statusCode: 401, success: false, message: "Unauthorized" });

  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

  const decodedToken = jwtmod.verify(token, public_key, {
    algorithms: ["RS256"],
  });

  const { email } = decodedToken as jwtmod.JwtPayload;
  req.user = email;
  next();
};
