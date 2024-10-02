import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name?: string;
        role?: string;
        phone?: string;
    }

    interface Session {
        user: {
            name: string;
            role: string;
            phone: string;
        }
        token: {
            name: string;
            role: string;
            phone: string;
        }
    }
}