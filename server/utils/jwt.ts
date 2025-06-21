import jwt, { type SignOptions } from "jsonwebtoken";

export interface IUserRequest {
  _id: string;
  email: string;
  name: string;
}

// 토큰 생성
const createToken = (user: IUserRequest, expiresIn: string): string | null => {
  const secret_key = process.env.JWT_SECRET as string;

  if (!user) {
    console.error("user 정보가 없습니다.");
    return null;
  }

  try {
    return jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      secret_key,
      {
        expiresIn,
      } as SignOptions,
    );
  } catch (error) {
    console.error("token 생성 실패", error);
    return null;
  }
};

export const accessToken = (user: IUserRequest) => createToken(user, "10m");
export const refreshToken = (user: IUserRequest) => createToken(user, "7d");
