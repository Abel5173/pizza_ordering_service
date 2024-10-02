// import { db } from "@/libs/db";
// import uploadToCloudinary from "@/utils/uploadToCloudinary";
// import { NextResponse } from "next/server";

// const createAdmin = async (req: Request) => {
//     let resturantId = null; // Default to no restaurant association
//     let roleID = null;
//     let permissionId = null;

//     // If restaurant details are provided, it's a manager registration
//     if (restaurantName && restaurantLocation) {
//         try {
//             const roleName = `${restaurantName.toString().toUpperCase()}_ADMIN`;

//             const existingPermission = await db.permission.findFirst({
//                 where: {
//                     action: "MANAGE_ALL",
//                     subject: "all",
//                 }
//             })

//             if (existingPermission) {
//                 permissionId = existingPermission.id;
//             } else {
//                 const newPermission = await db.permission.create({
//                     data: {
//                         action: "MANAGE_ALL",
//                         subject: "all",
//                     }
//                 });

//                 permissionId = newPermission.id;
//             }


//             // Check if role already exists
//             const existingRole = await db.role.findFirst({
//                 where: { name: roleName }
//             });

//             if (existingRole) {
//                 return NextResponse.json(
//                     { user: null, message: "Role already exists" },
//                     { status: 409 }
//                 );
//             }

//             // Create the role
//             const newRole = await db.role.create({
//                 data: {
//                     name: roleName
//                 }
//             })

//             roleID = newRole.id;
//             const newRolePermission = await db.rolePermission.create({
//                 data: {
//                     roleId: newRole.id,
//                     permissionId: permissionId
//                 }
//             })

//             const updatedRole = await db.role.update({
//                 where: { id: newRole.id },
//                 data: {
//                     permissions: {
//                         connect: {
//                             id: newRolePermission.id
//                         }
//                     }
//                 }
//             })

//             let fileBuffer: Buffer // here Buffer is a Node.js class that is used to handle binary data

//             if (logo instanceof File) {
//                 const arrayBuffer = await logo.arrayBuffer();
//                 fileBuffer = Buffer.from(arrayBuffer);
//             } else {
//                 return NextResponse.json(
//                     { user: null, message: "Invalid logo file" },
//                     { status: 400 }
//                 );
//             }

//             const mimeType = logo.type;
//             const encoding = "base64";
//             const base64 = Buffer.from(fileBuffer).toString(encoding);

//             // Save the logo to the database
//             const logoUrl = `data:${mimeType};${encoding},${base64}`;

//             const res = await uploadToCloudinary(logoUrl, logo.name);

//             if (!res.success) {
//                 return
//             }
//             // Create the restaurant in the database
//             const newResturant = await db.restaurant.create({
//                 data: {
//                     name: restaurantName as string,
//                     location: restaurantLocation as string,
//                     logo: res.result?.secure_url || "",
//                 },
//             });

//             // Get the restaurant ID to associate with the user
//             resturantId = newResturant.id;
//             roleID = newRole.id;
//         } catch (error) {
//             return NextResponse.json(
//                 { user: null, message: "Invalid logo file" },
//                 { status: 400 }
//             );
//         }

//     }
// }