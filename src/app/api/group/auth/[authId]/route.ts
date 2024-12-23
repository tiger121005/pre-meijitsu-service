import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const authId = pathname.split("/").pop();
    try {
        const group = await prisma?.group.findUnique({
            where: {
                auth_id: authId,
            },
        });
        return NextResponse.json(group, { status: 200 });
    } catch (error) {
        console.log("Failed to get group", error);
        return NextResponse.json({ error: "Failed to get group" }, { status: 500 });
    }
};