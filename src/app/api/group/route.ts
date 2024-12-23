import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const data = await prisma.group.findMany();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log("Request error", error)
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!prisma || !prisma.group) {
            throw new Error("No group model found");
        }
        if (!body) {
            console.log("body is empty");
            return 
        }
        await prisma.group.create({
            data: {
                name: body.name,
                type: body.type,
                email: body.email,
                hp: body.hp,
                insta: body.insta,
                x: body.x,
                tiktok: body.tiktok,
                auth_id: body.auth_id
            },
        })
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.log("Request error", error)
        return
    }
}