import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import type {
  AuthOptions,
  DefaultSession,
  DefaultUser,
  Session,
  User,
} from "next-auth";
import type { DefaultJWT, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./lib/database/db";
import { Auth } from "./lib/schemas/auth-schema";

declare module "next-auth" {
  interface JWT extends DefaultJWT {
    id: string;
    profile_image: string;
    introduce: string | null;
    like_category: string[];
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      profile_image: string;
      introduce: string | null;
      like_category: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string | null;
    profile_image: string;
    introduce: string | null;
    like_category: string[];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const { email, password } = credentials;

        await connectDB();

        const user = await Auth.findOne({ email });

        if (!user) {
          throw new Error("존재하지 않는 이메일 입니다.");
        }

        const passwordCheck = await compare(String(password), user.password);

        if (!passwordCheck) {
          throw new Error("비밀번호를 다시 한번 확인해주세요.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          profile_image: user.profile_image,
          introduce: user.introduce,
          like_category: user.like_category,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          profile_image: token.profile_image,
          introduce: token.introduce,
          like_category: token.like_category,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
