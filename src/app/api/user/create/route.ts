import { db, Role } from "@/libs/db";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import { hash } from "bcryptjs";
import { create } from "domain";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    let role: Role;
    try {
        const body = await req.formData();
        const name = body.get('name');
        const email = body.get('email') as string | null;
        const password = body.get('password');
        const phone = body.get('phone');
        const restaurantName = body.get('restaurantName');
        const restaurantLocation = body.get('restaurantLocation');
        const logo = body.get('logo');
        

        // Check if email already exists
        const existingUserByEmail = await db.user.findFirst({
            where: { email: email || undefined }
        })

        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists"},
                { status: 409 }
            );
        }

        const hashedPassword = await hash(password as string, 10);

        // Determine if this is a restaurant manager or customer
        let resturantId = null; // Default to no restaurant association
        let roleID = null;
        let permissionId = null;

        // If restaurant details are provided, it's a manager registration
        if (restaurantName && restaurantLocation) {
            try {
                const roleName = `${restaurantName.toString().toUpperCase()}_ADMIN`;

                const existingPermission = await db.permission.findFirst({
                    where: {
                        action: "manage",
                        subject: "all",
                    }
                })

                if (existingPermission) {
                    permissionId = existingPermission.id;
                } else {
                    const newPermission = await db.permission.create({
                        data: {
                            action: "manage",
                            subject: "all",
                        }
                    });

                    permissionId = newPermission.id;
                }


                // Check if role already exists
                const existingRole = await db.role.findFirst({
                    where: { name: roleName }
                });

                if (existingRole) {
                    return NextResponse.json(
                        { user: null, message: "Role already exists"},
                        { status: 409 }
                    );
                }

                // Create the role
                const newRole = await db.role.create({
                    data: {
                        name: roleName
                    }
                })

                roleID = newRole.id;
                const newRolePermission = await db.rolePermission.create({
                    data: {
                        roleId: newRole.id,
                        permissionId: permissionId
                    }
                })

                const updatedRole = await db.role.update({
                    where: { id: newRole.id },
                    data: {
                        permissions: {
                            connect: {
                                id: newRolePermission.id
                            }
                        }
                    }
                })

                let fileBuffer: Buffer // here Buffer is a Node.js class that is used to handle binary data
                
                if (logo instanceof File) {
                    const arrayBuffer = await logo.arrayBuffer();
                    fileBuffer = Buffer.from(arrayBuffer);
                } else {
                    return NextResponse.json(
                        { user: null, message: "Invalid logo file"},
                        { status: 400 }
                    );
                }

                const mimeType = logo.type;
                const encoding = "base64";
                const base64 = Buffer.from(fileBuffer).toString(encoding);

                // Save the logo to the database
                const logoUrl = `data:${mimeType};${encoding},${base64}`;

                const res = await uploadToCloudinary(logoUrl, logo.name);

                if (!res.success) {
                    return 
                }
                // Create the restaurant in the database
                const newResturant = await db.restaurant.create({
                    data: {
                        name: restaurantName as string,
                        location: restaurantLocation as string,
                        logo: res.result?.secure_url || "", 
                    },
                });
    
                // Get the restaurant ID to associate with the user
                resturantId = newResturant.id;
                roleID = newRole.id;
            } catch (error) {
                return NextResponse.json(
                    { user: null, message: "Invalid logo file"},
                    { status: 400 }
                );
            }

        } else {
            try {
                const roleName = "CUSTOMER";

                const existingPermission = await db.permission.findFirst({
                    where: {
                        action: "manage",
                        subject: "user",
                    }
                })

                if (existingPermission) {
                    permissionId = existingPermission.id;
                } else {
                    const newPermission = await db.permission.create({
                        data: {
                            action: "manage",
                            subject: "user",
                        }
                    });

                    permissionId = newPermission.id;
                }


                // Check if role already exists
                const existingRole = await db.role.findFirst({
                    where: { name: roleName }
                });

                if (existingRole) {
                    return NextResponse.json(
                        { user: null, message: "Role already exists" },
                        { status: 409 }
                    );
                }

                // Create the role
                const newRole = await db.role.create({
                    data: {
                        name: roleName
                    }
                })

                roleID = newRole.id;
                const newRolePermission = await db.rolePermission.create({
                    data: {
                        roleId: newRole.id,
                        permissionId: permissionId
                    }
                })

                const updatedRole = await db.role.update({
                    where: { id: newRole.id },
                    data: {
                        permissions: {
                            connect: {
                                id: newRolePermission.id
                            }
                        }
                    }
                })
            } catch (error) {
                return NextResponse.json(
                    { user: null, message: "Invalid logo file"},
                    { status: 400 }
                );
            }
        }

        // Create the user in the database
        const newUser = await db.user.create({
            data: {
                name: typeof name === 'string' ? name : null,
                email: email,
                password: hashedPassword,
                phone: typeof phone === 'string' ? phone : null,
                restaurantId: resturantId, // null for customers, actual ID for managers
            },
        });

        if (roleID) {
            const newUserRole = await db.userRole.create({
                data: {
                    roleId: roleID,
                    restaurantId: resturantId,
                }
            })

            await db.user.update({
                where: { id: newUser.id },
                data: {
                    userRole: newUserRole.id
                }
            })
        }
        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.error();
    }
}