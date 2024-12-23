'use client'

import Title from "@/components/texts/Title"
import MainLinkButton from "@/components/button/MainLinkButton"
import SideMenu from "@/components/SideMenu"
import { useState, useEffect } from "react"
import { ApplyType } from "@/types/apply"
import { getApplyList } from "../../../../../utils/supabase/applyActions"

export default function Page() {

    const [applyList, setApplyList] = useState<ApplyType[]>([]);
    const groupId = getGroupId();

    useEffect(() => {
        getApplyList(groupId).then((data) => {
            if (data) {
                const applyList = data.map((apply) => {
                    const data: ApplyType = {
                        id: apply.id,
                        title: apply.title,
                        detail: apply.detail,
                        type: apply.type,
                        detailType: apply.detailType,
                        time: apply.time,
                        collaboration: apply.collaboration,
                        groupId: apply.groupId,
                        priority: apply.priority,
                        newProject: apply.newProject,
                    };
                    return data;
                });
                setApplyList(applyList);
            }
        })
    }, [groupId]);

    function getGroupId(): number {
        const url = new URL(window.location.href);
        const groupId = url.pathname.split('/')[2];
        return Number(groupId);
    }

    return (
        <div className="flex">
            <SideMenu />
            <div className="flex flex-col items-center bg-white w-full">
                <Title>応募一覧</Title>
                <MainLinkButton href={`/mypage/${groupId}/applies/apply`} className="w-52">応募する</MainLinkButton>
                <div className="text-black">
                    {applyList.map((apply) => {
                        return (
                            <div key={apply.id} className="border-2 border-gray-400">
                                <div>{apply.title}</div>
                                <div>{apply.detail}</div>
                                <div>{apply.type}</div>
                                <div>{apply.detailType}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}