import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcryptjs";
import { defineAbilityFor } from "./abilities";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "Enter your email here" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                console.log(credentials)
                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!existingUser) {
                    return null;
                }
                
                if (!existingUser.password) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);
                
                if (!passwordMatch) {
                    return null;
                }
                
                const ability = defineAbilityFor(existingUser, existingUser.id)
                const roleID = existingUser.userRole
                if (roleID) {
                    const role = await db.role.findUnique({
                        where: { id: roleID }
                    })
                    if (role) {
                        console.log("What is happening?");
                        console.log(role.name);
                        return {
                            id: existingUser.id,
                            phone: existingUser.phone ?? undefined,
                            name: existingUser.name ?? undefined,
                            email: existingUser.email,
                            role: role.name,
                            ability: ability
                        }
                    }
                }
                console.log(existingUser)
                return {
                    id: existingUser.id,
                    phone: existingUser.phone ?? undefined,
                    name: existingUser.name ?? undefined,
                    email: existingUser.email,
                    role: existingUser.userRole?.toString() ?? undefined,
                    ability: ability
                }
            }
        })
    ],
    callbacks: {
        
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                console.log("User found in JWT callback", user);
                console.log("Token found in JWT callback", token);
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    ability: user.ability
                }
            }
            console.log(token)
            return token;
        },

        async session({ session, token, user }: { session: any, token: any, user: any }) {

            session.user = {
                ...session.user,
                id: token.id,
                name: token.name,
                phone: token.phone,
                email: token.email, // Keep email from session.user
                role: token.role,
                ability: token.ability
            }
            console.log("Session callback invoked", session);  // Check if this log appears
            return session;
        },

    }
}