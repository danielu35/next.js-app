import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

// I need to set authOptions to NextAuthOptions type so i can have more options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com"},
                password: { label: "Password", type: "password"}
        },
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({ where: {email: credentials.email}});

                if(!user) return null;

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);

                return passwordMatch ? user : null;

        }
    }),
        GoogleProvider({
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