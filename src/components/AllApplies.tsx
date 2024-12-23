'use client'

import { ApplyType } from "@/types/apply";
import { getAllApplies } from "../../utils/supabase/applyActions"
import Link from "next/link";
import { useState, useEffect } from "react";
import Pulldown from "./Pulldown";
export default function AllApplies() {
    const [datas, setDatas] = useState<ApplyType[]>([]);
    const [type, setType] = useState<string>("");
    const [detailType, setDetailType] = useState<string>("");
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const types = ['', '教室企画', '屋外ステージ企画', '模擬店企画']
    const [detailTypes, setDetailTypes] = useState<string[]>([])

    useEffect(() => {
        getDatas();
    }, [])

    useEffect(() => {
        if (type === '教室企画') {
            setDetailTypes(['', '大教室', '中教室', '小教室'])
        } else if (type === '屋外ステージ企画') {
            setDetailTypes(['', 'メインステージ', 'パフォーマンスエリア', 'エントランスエリア'])
        } else if (type === '模擬店企画') {
            setDetailTypes(['', '調理企画', '物品販売･参加体験企画'])
        } else {
            setDetailTypes([])
        }
        setDetailType('')
    }, [type])
    function handlePulldownToggle(pulldownIndex: number) {
        setIsOpen(isOpen === pulldownIndex ? null : pulldownIndex);
    }

    async function getDatas() {
        getAllApplies(type, detailType).then((data) => {
            console.log(data); 
            if (!data) return;
            setDatas(data);
            return data
        });
    }

    return (
        <div className="text-black flex flex-col items-center">
            <div className="mb-16 flex flex-col gap-3 items-center">
                <Pulldown title='参加枠' value={type} onChange={setType} datas={types} isOpen={isOpen === 1} onToggle={() => handlePulldownToggle(1)} className="w-full" />
                <Pulldown title="企画区分" value={detailType} onChange={setDetailType} datas={detailTypes} isOpen={isOpen === 2} onToggle={() => handlePulldownToggle(2)} className="w-full" />
                <button onClick={getDatas} className="bg-blue-500 text-white p-2 rounded-md w-40 mt-5">検索</button>
            </div>
            <div className="flex flex-col gap-3">
                {datas?.map((data: ApplyType) => (
                    <ApplyCard key={data.id} id={data.id} title={data.title} detail={data.detail} type={data.type} detailType={data.detailType} time={data.time ?? 0} collaboration={data.collaboration ?? ""} groupId={data.groupId} groupName={data.group?.name ?? ""} priority={data.priority} newProject={data.newProject} />
                ))}
            </div>
        </div>
    )
}

type ApplyCardProps = {
    id: number;
    title: string;
    detail: string;
    type: string;
    detailType: string;
    time: number;
    collaboration: string;
    groupId: number;
    groupName: string;
    priority: boolean;
    newProject: boolean;
}

function ApplyCard({ id, title, detail, type, detailType, time, collaboration, groupId, groupName, priority, newProject }: ApplyCardProps) {
    return (
        <Link href={`/official/applies/apply?id=${id}&title=${encodeURIComponent(title)}&detail=${encodeURIComponent(detail)}&type=${encodeURIComponent(type)}&detailType=${encodeURIComponent(detailType)}&time=${encodeURIComponent(time)}&collaboration=${encodeURIComponent(collaboration)}&groupId=${encodeURIComponent(groupId)}&groupName=${encodeURIComponent(groupName)}&priority=${encodeURIComponent(priority)}&newProject=${encodeURIComponent(newProject)}`}>
            <div className="flex flex-col gap-1 border-2 border-gray-400 p-2 rounded-md">
                <CardRow title="タイトル">{title}</CardRow>
                <CardRow title="団体名">{groupName}</CardRow>
                <CardRow title="参加枠">{type}</CardRow>
            </div>
        </Link>
    )
}

function CardRow({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex">
            <p className="w-28">{title}</p>
            <p>{children}</p>
        </div>
    )
}