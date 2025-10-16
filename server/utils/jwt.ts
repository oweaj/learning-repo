import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

// 토큰 생성
const createToken = (userId: string, expiresIn: string): string | null => {
  if (!userId) {
    console.error("user 정보가 없습니다.");
    return null;
  }

  const secret_key = process.env.JWT_SECRET as string;

  try {
    return jwt.sign({ _id: userId }, secret_key, { expiresIn } as SignOptions);
  } catch (error) {
    console.error("token 생성 실패했습니다.", error);
    return null;
  }
};

// 토큰 검증
export const verifyToken = (token: string): JwtPayload | null => {
  const secret_key = process.env.JWT_SECRET as string;
  try {
    return jwt.verify(token, secret_key) as JwtPayload;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
};

export const accessToken = (userId: string) => createToken(userId, "10m");
export const refreshToken = (userId: string) => createToken(userId, "1d");
