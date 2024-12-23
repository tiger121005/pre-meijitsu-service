import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        if (!prisma || !prisma.apply) {
            throw new Error("No apply model found");
        }
        const url = new URL(req.url);
        const groupId = url.pathname.split("/").pop();
        const data = await prisma.apply.findMany({
            where: {
                groupId: Number(groupId),
            },
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error) {
            console.log("Request error", error)
        }
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
}