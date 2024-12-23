'use server'

import { ApplyType } from "@/types/apply";
import { Apply } from "@prisma/client";
import { headers } from "next/headers";

export async function applyProgram(data: ApplyType): Promise<boolean> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) {
            console.log('host is empty');
            return false;
        };
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        console.log("apiBase");
        await fetch(`${apiBase}/api/apply`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("応募が完了しました");
        return true;
    } catch (error) {
        console.error("応募に失敗しました", error);
        return false;
    }
}

export async function getAllApplies(type: string, detailType: string): Promise<Apply[] | null> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return null;
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/apply?type=${encodeURIComponent(type)}&detailType=${encodeURIComponent(detailType)}`);
        if (!res.ok) {
            throw new Error("Failed to get apply list");
        }
        const data = await res.json();
        const applyList: ApplyType[] = data.map((apply: ApplyType) => {
            const data: ApplyType = {
                id: apply.id,
                title: apply.title,
                detail: apply.detail,
                type: apply.type,
                detailType: apply.detailType,
                time: apply.time,
                collaboration: apply.collaboration,
                groupId: apply.groupId,
                group: apply.group,
                priority: apply.priority,
                newProject: apply.newProject,
            };
            return data;
        });
        console.log("applyList", applyList);
        return applyList;
    } catch (error) {
        console.log("Failed to get apply list", error);
        return null;
    }
}

export async function getApplyList(groupId: number): Promise<Apply[] | null> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return null;
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/apply/group/${groupId}`);
        if (!res.ok) {
            throw new Error("Failed to get apply list");
        }
        const data = await res.json();
        if (data.length === 0 ) return null;
        const applyList = data.map((apply: ApplyType) => {
            const data: ApplyType = {
                id: apply.id,
                title: apply.title,
                detail: apply.detail,
                type: apply.type,
                detailType: apply.detailType,
                time: apply.time,
                collaboration: apply.collaboration,
                groupId: apply.groupId,
                group: apply.group,
                priority: apply.priority,
                newProject: apply.newProject,
            };
            return data;
        });
        return applyList;
    } catch (error) {
        console.log("Failed to get apply list", error);
        return null;
    }
}

export async function getApply(applyId: number): Promise<Apply | null> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return null;
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/apply/${applyId}`);
        if (!res.ok) {
            throw new Error("Failed to get apply");
        }
        const data = await res.json();
        const apply = {
            id: data.id,
            title: data.title,
            detail: data.detail,
            type: data.type,
            detailType: data.detailType,
            time: data.time,
            collaboration: data.collaboration,
            groupId: data.groupId,
            priority: data.priority,
            newProject: data.newProject,
        };
        return apply;
    } catch (error) {
        console.log("Failed to get apply", error);
        return null;
    }
}