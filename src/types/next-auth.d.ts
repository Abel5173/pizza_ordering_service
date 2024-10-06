import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name?: string;
        role?: string;
        phone?: string;
        permissions?: string[];
        ability?: any;
    }

    interface Session {
        user: User & {
            name: string;
            role: string;
            phone: string;
            permissions: string[];
            ability: any;
        }
        token: {
            name: string;
            role: string;
            phone: string;
            permissions: string[];
            ability: any;
        }
    }
}