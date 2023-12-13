import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
// import bcrypt from 'bcrypt'

// I need to set authOptions to NextAuthOptions type so i can have more options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com"},
                password: { label: "Password", type: "password", placeholder: "Password12"}
            },
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({ where: {email: credentials.email}});
console.log("user", user)
                if(!user) return null;
console.log("credentials", credentials)
                // const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
                const passwordMatch = (credentials.password === user.hashedPassword);
console.log("passwordMatch", passwordMatch)
                return passwordMatch ? user : null;

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: "2.0"
        })
    ],
    // This is storing the Users session JWT
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
