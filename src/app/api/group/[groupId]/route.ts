import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const groupId = pathname.split("/").pop();
    try {
        const group = await prisma?.group.findUnique({
            where: {
                id: Number(groupId),
            },
        });
        return NextResponse.json(group, { status: 200 });
    } catch (error) {
        console.log("Failed to get group", error);
        return NextResponse.json({ error: "Failed to get group" }, { status: 500 });
    }
};

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const groupId = pathname.split("/").pop();
    try {
        const data = await req.json();
        await prisma.group.update({
            where: {
                id: Number(groupId)
            },
            data: {
                name: data.name,
                hp: data.hp,
                insta: data.insta,
                x: data.x,
                tiktok: data.tiktok,
                type: data.type
            }
        })
    } catch (error) {
        console.log("Failed to update group", error);
        return NextResponse.json({ error: "Failed to update group" }, { status: 500 });
    }
}