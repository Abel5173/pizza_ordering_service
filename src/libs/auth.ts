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
<<<<<<< HEAD
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
=======
                
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                console.log(credentials)
>>>>>>> f7e1f16 (Remove secret key)
                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!existingUser) {
                    return null;
                }
<<<<<<< HEAD

=======
                
>>>>>>> f7e1f16 (Remove secret key)
                if (!existingUser.password) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);
<<<<<<< HEAD

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

=======
                
                if (!passwordMatch) {
                    return null;
                }
                
>>>>>>> f7e1f16 (Remove secret key)
                const ability = defineAbilityFor(existingUser, existingUser.id)
                const roleID = existingUser.userRole
                if (roleID) {
                    const role = await db.role.findUnique({
                        where: { id: roleID }
                    })
                    if (role) {
<<<<<<< HEAD
                        console.log(permissionsArray[0])
=======
                        console.log("What is happening?");
                        console.log(role.name);
>>>>>>> f7e1f16 (Remove secret key)
                        return {
                            id: existingUser.id,
                            phone: existingUser.phone ?? undefined,
                            name: existingUser.name ?? undefined,
                            email: existingUser.email,
                            role: role.name,
<<<<<<< HEAD
                            permissions: permissionsArray,
=======
>>>>>>> f7e1f16 (Remove secret key)
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
<<<<<<< HEAD
                    permissions: permissionsArray,
=======
>>>>>>> f7e1f16 (Remove secret key)
                    ability: ability
                }
            }
        })
    ],
    callbacks: {
<<<<<<< HEAD
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
=======
        
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                console.log("User found in JWT callback", user);
                console.log("Token found in JWT callback", token);
>>>>>>> f7e1f16 (Remove secret key)
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
<<<<<<< HEAD
                    role: user.role,
                    permissions: user.permissionsArray,
=======
                    email: user.email,
                    role: user.role,
>>>>>>> f7e1f16 (Remove secret key)
                    ability: user.ability
                }
            }
            console.log(token)
            return token;
        },
<<<<<<< HEAD
        async session({ session, token }: { session: any, token: any }) {
            session.user = {
=======

        async session({ session, token, user }: { session: any, token: any, user: any }) {

            session.user = {
                ...session.user,
>>>>>>> f7e1f16 (Remove secret key)
                id: token.id,
                name: token.name,
                phone: token.phone,
                email: token.email, // Keep email from session.user
                role: token.role,
<<<<<<< HEAD
                permissions: token.permissions,
                ability: token.ability
            }
            console.log(session)
            return session;
        }
=======
                ability: token.ability
            }
            console.log("Session callback invoked", session);  // Check if this log appears
            return session;
        },

>>>>>>> f7e1f16 (Remove secret key)
    }
}