import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const filter: { title?: string; type?: string; detailType?: string } = {};
        const title = searchParams.get('title');
        const type = searchParams.get('type');
        const detailType = searchParams.get('detailType');
        if (title && title !== '') {
            filter.title = title;
            // const filterTitle = filter.title;
            // if (filterTitle) {
            //     filter.title = filterTitle + searchParams.get('title');
            // }
        }
        if (type && type !== '') {
            filter.type = type;
            // if (filterType) {
            //     filter.type = filterType + searchParams.get('type');
            //     console.log("filterType", filterType);
            // } else {
            //     console.log("Don't call filterType");
            // }
        }
        if (detailType && detailType !== '') {
            filter.detailType = detailType;
            // const filterDetailType = filter.detailType;
            // if (filterDetailType) {
            //     filter.detailType = filterDetailType + searchParams.get('detailType');
            // }
        }
        //ページネーションは後で実装
        const data = await prisma.apply.findMany({
            where: filter,
            include: {
                group: true
            }
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log("Request error", error)
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body) {
            throw new Error("Request body is null or undefined");
        }
        if (!prisma || !prisma.apply) {
            throw new Error("No apply model found");
        }
        console.log("body", body);
        const data = await prisma.apply.create({
            data: {
                title: body.title,
                detail: body.detail,
                type: body.type,
                detailType: body.detailType,
                time: body.time,
                collaboration: body.collaboration,
                groupId: body.groupId,
                priority: body.priority,
                newProject: body.newProject
            },
        });
        console.log("data", data);
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        if (error) {
            console.log("Request error", error)
        }
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
}