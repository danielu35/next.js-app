import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// I need to set authOptions to NextAuthOptions type so i can have more options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })],
    // This is storing the Users session JWT
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }