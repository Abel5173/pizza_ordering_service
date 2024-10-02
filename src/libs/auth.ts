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
                const permissions = existingUser.userRole ? await db.permission.findMany({
                    where: { roles: { some: { id: existingUser.userRole } } }
                }) : [];
                
                const permissionsArray = permissions.map(permission => {
                    return {
                        action: permission.action,
                        subject: permission.subject
                    }
                })

                const ability = defineAbilityFor(existingUser, existingUser.id)
                const roleID = existingUser.userRole
                if (roleID) {
                    const role = await db.role.findUnique({
                        where: { id: roleID }
                    })
                    if (role) {
                        console.log(permissionsArray[0])
                        return {
                            id: existingUser.id,
                            phone: existingUser.phone ?? undefined,
                            name: existingUser.name ?? undefined,
                            email: existingUser.email,
                            role: role.name,
                            permissions: permissionsArray,
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
                    permissions: permissionsArray,
                    ability: ability
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                    permissions: user.permissionsArray,
                    ability: user.ability
                }
            }
            console.log(token)
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user = {
                id: token.id,
                name: token.name,
                phone: token.phone,
                email: token.email, // Keep email from session.user
                role: token.role,
                permissions: token.permissions,
                ability: token.ability
            }
            console.log(session)
            return session;
        }
    }
}