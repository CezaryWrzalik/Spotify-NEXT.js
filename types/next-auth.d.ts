import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string
			refreshToken?: string 
			username: string;
      name: string;
      image: string;
    }
  }
}


declare module "next-auth/jwt" {
  interface JWT {
		accessTokenExpires: number
		accessToken?: string;
		refreshToken?: string;
    username: string;
  }
}

