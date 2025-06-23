import jwt, { type SignOptions } from "jsonwebtoken";

export interface IUserRequest {
  _id: string;
  email?: string;
  name?: string;
}

// 토큰 생성
const createToken = (
  payload: IUserRequest,
  expiresIn: string,
): string | null => {
  if (!payload) {
    console.error("user 정보가 없습니다.");
    return null;
  }

  const secret_key = process.env.JWT_SECRET as string;

  try {
    return jwt.sign(payload, secret_key, { expiresIn } as SignOptions);
  } catch (error) {
    console.error("token 생성 실패했습니다.", error);
    return null;
  }
};

// 토큰 검증
export const verifyToken = (token: string): IUserRequest | null => {
  const secret_key = process.env.JWT_SECRET as string;
  try {
    return jwt.verify(token, secret_key) as IUserRequest;
  } catch {
    return null;
  }
};

export const accessToken = (user: IUserRequest) => createToken(user, "30m");
export const refreshToken = (user: IUserRequest) => createToken(user, "7d");
