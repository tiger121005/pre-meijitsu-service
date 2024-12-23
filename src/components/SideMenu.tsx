'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGroupName } from "../../utils/client/localStorage";

export default function SideMenu() {

    const [groupName, setGroupName] = useState<string>("")
    const groupId = getGroupId();

    useEffect(() => {
        const name = getGroupName();
        console.log(name)
        if (name) {
            setGroupName(name)
        }
    }, [])

    function getGroupId(): number {
        const url = new URL(window.location.href);
        const groupId = url.pathname.split('/')[2];
        return Number(groupId);
    }

    return (
        <div className="bg-black text-white w-64 h-screen">
            <h2 className="py-9 mx-5">{groupName}</h2>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/mypage/${groupId}`} className="block p-4">参加企画一覧</Link>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/mypage/${groupId}/applies`} className="block p-4">応募企画一覧</Link>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/mypage/${groupId}/setting-group`} className="block p-4">団体設定</Link>
            <div className="w-full h-[1px] bg-white" />
        </div>
    )
}

export function OfficialSideMenu() {

    return (
        <div className="bg-black text-white w-64 h-screen">
            <h2 className="py-9 mx-5">明大祭実行委員会</h2>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/official`} className="block p-4">企画一覧</Link>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/official/applies`} className="block p-4">応募企画一覧</Link>
            <div className="w-full h-[1px] bg-white" />
            <Link href={`/official/groups`} className="block p-4">団体一覧</Link>
            <div className="w-full h-[1px] bg-white" />
        </div>
    )
}