'use server'

import { createClient } from "./server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GroupType } from "@/types/group";

export async function registerGroup(name: string, type: string, email: string, password: string, hp?: string, insta?: string, x?: string, tiktok?: string) {
    const auth_id = await addAuth(email, password);
    if (!auth_id) {
        console.log("Failed to create auth");
        return;
    }
    const data = await addGroup(name, type, email, auth_id, hp, insta, x, tiktok);
    console.log("id1", data.id);
    if (data.id === undefined) {
        const id = (await getGroupData(auth_id)).id;
        console.log("id4", id);
        redirect(`/mypage/${id}`);
    } else {
        console.log("id3", data.id);
        redirect(`/mypage/${data.id.toString()}`);
    }
}

export async function login(email: string, password: string): Promise<{id: number, authId: string, name: string}> {
    const supabase = await createClient();
    const signinData = {
        email: email,
        password: password
    }
    const { data, error } = await supabase.auth.signInWithPassword(signinData);
    if (error) {
        console.log("Failed to sign in", error);
        return {id: 0, authId: "", name: "error login"};
    }
    const userId = data?.user?.id;
    if (!userId) {
        console.log("Failed to get user id");
        revalidatePath("/mypage", 'layout');
        return {id: 0, authId: "", name: "error login"};
    } else {
        const groupData = await getGroupData(userId);
        revalidatePath("/mypage", 'layout');
        return { id: groupData.id, authId: userId, name: groupData.name };
    }
}

export async function logout() {
    const supabase = await createClient();
    supabase.auth.signOut();
    redirect('/login');
}

export async function getAllGroups(): Promise<GroupType[] | null> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return null;
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/group`);
        if (!res.ok) {
            throw new Error("Failed to get group list");
        }
        const data = await res.json();
        const groupList: GroupType[] = data.map((group: GroupType) => {
            const data: GroupType = {
                id: group.id,
                name: group.name,
                auth_id: group.auth_id,
                type: group.type,
                email: group.email,
                insta: group.insta,
                x: group.x,
                tiktok: group.tiktok,
                hp: group.hp,
            };
            return data;
        });
        return groupList;
    } catch (error) {
        console.log("Failed to get group list", error);
        return null;
    }
}

export async function getGroup(groupId: number): Promise<GroupType | null> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return null;
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/group/${groupId}`);
        if (!res.ok) {
            throw new Error("Failed to get apply");
        }
        const data = await res.json();
        console.log("groupData", data);
        const group: GroupType = {
            id: data.id,
            name: data.name,
            auth_id: data.auth_id,
            type: data.type,
            email: data.email,
            insta: data.insta,
            x: data.x,
            tiktok: data.tiktok,
            hp: data.hp,
        };
        return group;
    } catch (error) {
        console.log("Failed to get apply", error);
        return null;
    }
}

export async function getGroupData(authId: string): Promise<{id: number, name: string}> {
    try {
        const headersData = headers();
        const host = (await headersData).get("host");
        if (!host) return {id: 0, name: "error get group name"};
        const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
        const apiBase = `${protocol}://${host}`
        const res = await fetch(`${apiBase}/api/group/auth/${authId}`);
        if (!res.ok) {
            throw new Error("Failed to get group name");
        }
        const data = await res.json();
        console.log(data.name);
        return {id: data.id, name: data.name};
    } catch (error) {
        console.log("Failed to get group", error);
        return { id: 0, name: "error get group name" };
    }
}

export async function updateGroup(name: string, hp: string, insta: string, x: string, tiktok: string, type: string, groupId: number) {
    try {
        const res = await fetch(`/api/group/${groupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, hp, insta, x, tiktok, type })
        });
        if (!res.ok) {
            throw new Error("Failed to update group");
        }
        // return NextResponse.json(res.json(), { status: 200 });
    } catch (error) {
        console.error("応募に失敗しました", error);
        // return NextResponse.json({ error: "Error updating group" }, { status: 500 });
    }
}

async function addAuth(email: string, password: string): Promise<string | null> {
    const supabase = await createClient();
    const signinData = {
        email: email,
        password: password
    }
    const { data, error } = await supabase.auth.signUp(signinData);
    if (error) {
        console.log("Failed to sign up", error);
        return null;
    }
    const userId = data?.user?.id;
    if (userId) {
        return userId;
    }
    return null;
}

async function addGroup(name: string, type: string, email: string, auth_id: string, hp?: string, insta?: string, x?: string, tiktok?: string): Promise<{id: number, name: string}> {
    const headersData = headers();
    const host = (await headersData).get("host");
    if (!host) return {id: 0, name: "error add group"};
    const protocol = (await headersData).get("x-forwarded-proto") ?? host.startsWith('localhost') ? 'http' : 'https'
    const apiBase = `${protocol}://${host}`
    try {
        const res = await fetch(`${apiBase}/api/group`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, hp, insta, x, tiktok, type, email, auth_id })
        });
        if (!res.ok) {
            throw new Error("Failed to add group");
        }
        const data = await res.json();
        return {id: data.id, name: data};
    } catch (error) {
        console.error("Failed to add group", error);
        return {id: 0, name: "error add group"};
    }
}