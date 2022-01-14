import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      accesToken: unknown,
			refreshToken: uknnown,
			username: uknnown;
    }
  }
}


declare module "next-auth/jwt" {
  interface JWT {
		accessTokenExpires: number
		accessToken: string;
		refreshToken?: string;
  }
}

