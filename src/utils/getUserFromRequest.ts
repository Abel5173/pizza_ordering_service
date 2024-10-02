// src/utils/getUserFromRequest.ts
import { NextRequest } from 'next/server';
import { db } from '../libs/db'; // Assuming you have db set up here

export async function getUserFromRequest(req: NextRequest) {
    const userId = req.headers.get('x-user-id'); // Assuming you're passing a user ID in headers

    if (!userId) return null;

    // Fetch the user with their roles and permissions
    const user =  await db.user.findUnique({
        where: { id: userId },
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true
                                }
                            }
                        }
                    }
                }
            }
        },
    });

    if (!user || !user.userRoles) return null;

    return user;
}
