import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name?: string;
        role?: string;
        phone?: string;
<<<<<<< HEAD
    }

    interface Session {
        user: {
            name: string;
            role: string;
            phone: string;
=======
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
>>>>>>> f7e1f16 (Remove secret key)
        }
        token: {
            name: string;
            role: string;
            phone: string;
<<<<<<< HEAD
=======
            permissions: string[];
            ability: any;
>>>>>>> f7e1f16 (Remove secret key)
        }
    }
}