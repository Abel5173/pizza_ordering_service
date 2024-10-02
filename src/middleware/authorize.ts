import { defineAbilityFor } from "@/libs/abilities";
import { getUserFromRequest } from "@/utils/getUserFromRequest";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function authorize(req: NextRequest) {

    // Allow public routes without authentication
    const publicRoutes = ['/api/auth', '/sign-in', '/sign-up', '/'];

    if(publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Step 1: Get the user from the request
    const user = await getUserFromRequest(req);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('User:', user);
    // Step 2: Define the abilities for the user based on the user's role and permissions
    const ability = await defineAbilityFor(user);

    // Step 3: Define the action and the resource based on the request
    const { pathname } = req.nextUrl;
    const method = req.method.toLowerCase();

    let resource: any | undefined
    let action: string | undefined

    // Determine resource and action based on the path and method
    if (pathname.includes('/api/orders')) {
        resource = 'Order'
        action = method === 'get' ? 'read' : method === 'post' ? 'create' : method === 'put' ? 'update' : method === 'delete' ? 'delete' : 'manage';
    } else if (pathname.includes('/api/pizzas')) {
        resource = 'Pizza'
        action = method === 'get' ? 'read' : method === 'post' ? 'create' : method === 'put' ? 'update' : method === 'delete' ? 'delete' : 'manage';
    } else if (pathname.includes('/api/toppings')) {
        resource = 'Topping'
        action = method === 'get' ? 'read' : method === 'post' ? 'create' : method === 'put' ? 'update' : method === 'delete' ? 'delete' : 'manage';
    } else if (pathname.includes('/api/users')) {
        resource = 'User'
        action = method === 'get' ? 'read' : method === 'post' ? 'create' : method === 'put' ? 'update' : method === 'delete' ? 'delete' : 'manage';
    }

    // Step 4: Check if the user is allowed to perform the action on the resource
    if (action && resource && ability.cannot(action, resource)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Step 5: If the user is allowed to perform the action on the resource, return a 200 OK response
    return NextResponse.next();
}