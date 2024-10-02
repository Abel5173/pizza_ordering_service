import { User, Order, Pizza, Topping } from '@prisma/client'
import { AbilityBuilder, PureAbility } from '@casl/ability'
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma'
import { db } from './db';
import { permission } from 'process';
import { getServerSession } from 'next-auth';

type AppSubjects = Subjects <{
    User: User;
    Order: Order;
    Pizza: Pizza;
    Topping: Topping;
    all: {};
}>

// `PureAbility` is a type that represents the ability instance. It's a generic type that takes two arguments: the type of the subject and the type of the query object. In our case, the subject is a tuple of string and AppSubjects and the query object is PrismaQuery from @casl/prisma
type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

// This function defines the ability for the user based on their permissions
export async function defineAbilityFor(user?: User | null, id?: string | null) {
    // const session = await getServerSession();
    // console.log(session)
    if (id) {
        const user = await db.user.findUnique({
            where: { id: id },
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
        })

        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

        if (!user || !user.userRoles) return build();

        const permissions = Array.isArray(user.userRole) ? user.userRole.map((userRole: { role: { permissions: { permission: { action: any; subject: any; }; }[]; }; }) =>
            userRole.role.permissions.map((rolePermission: { permission: { action: any; subject: any; }; }) => ({
                action: rolePermission.permission.action,
                subject: rolePermission.permission.subject
            }))).flat() : [];

        // If the user is nor logged in return an empty ability
        if (!permissions) {
            return build();
        }

        // The ability is built based on the user's permissions
        permissions.forEach((permission) => {
            can(permission.action, permission.subject);
        })
        console.log(permissions)
        return build();

    }
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    // The ability is built based on the user's permissions
    const permissions = Array.isArray(user?.userRole) ? user.userRole.map((userRole) =>
        userRole.role.permissions.map((rolePermission: { permission: { action: any; subject: any; }; }) => ({
            action: rolePermission.permission.action,
            subject: rolePermission.permission.subject
        }))).flat() : [];

    // If the user is nor logged in return an empty ability
    if (!permissions) {
        return build();
    }

    // The ability is built based on the user's permissions
    permissions.forEach((permission) => {
        can(permission.action, permission.subject);
    })

    return build();
}