'use client'

import Input from "@/components/Input";
import Pulldown from "@/components/Pulldown";
import Title from "@/components/texts/Title";
import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import MainButton from "@/components/button/MainButton";
import { applyProgram } from "../../../../../../utils/supabase/applyActions";
import { ApplyType } from "@/types/apply";
import { redirect } from "next/navigation";


export default function Page() {
    const [programName, setProgramName] = useState("")
    const [detail, setDetail] = useState("")
    const [type, setType] = useState("")
    const [detailType, setDetailType] = useState("")
    const [time, setTime] = useState("0")
    const [times, setTimes] = useState<string[]>([])
    const [collaboration, setCollaboration] = useState("")
    const [priority, setPriority] = useState(false)
    const [newProject, setNewProject] = useState(false)

    const groupId = getGroupId();
    const [openPulldown, setOpenPulldown] = useState<number | null>(null)

    const types = ['教室企画', '屋外ステージ企画', '模擬店企画']
    const roomTypes = ['大教室', '中教室', '小教室']
    const stageTypes = ['メインステージ', 'パフォーマンスエリア', 'エントランスエリア']
    const storeTypes = ['調理企画', '物品販売・参加体験企画']

    function handlePulldownToggle(pulldownIndex: number) {
        setOpenPulldown(openPulldown === pulldownIndex ? null : pulldownIndex)
    }

    useEffect(() => {
        setDetailType("")
    }, [type])

    useEffect(() => {
        setTime("0")
        if (detailType === "メインステージ") {
            setTimes(['10', '15', '20', '25'])
        } else if (detailType === "パフォーマンスエリア") {
            setTimes(['10', '15', '20', '25', '30'])
        } else if (detailType === "エントランスエリア") {
            setTimes(['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'])
        }
    }, [detailType])

    function getGroupId(): number{
        const url = new URL(window.location.href)
        const groupId = url.pathname.split('/')[2]
        return Number(groupId)
    }

    async function apply() {
        console.log("apply")
        if (groupId === null) {
            alert("ユーザー情報が取得できていません")
            return
        }
        if (programName === "") {
            alert("プログラム名を入力してください")
            return
        }
        if (detail === "") {
            alert("説明文を入力してください")
            return
        }
        if (type === "" || type === null) {
            alert("参加枠を選択してください")
            return
        }
        if (detailType === "" || detailType === null) {
            alert("企画区分を選択してください")
            return
        }
        if (type === "屋外ステージ企画" && time === "0") {
            alert("実施時間を選択してください")
            return
        }
        const data: ApplyType = {
            id: 0,
            title: programName,
            detail: detail,
            type: type,
            detailType: detailType,
            time: Number(time),
            collaboration: collaboration,
            groupId: groupId,
            priority: priority,
            newProject: newProject
        }
        await applyProgram(data).then((success) => {
            if (success) {
                redirect(`/mypage/${groupId}/applies`)
            }
        });
        console.log("apply", data)
    }

    return (
        <div className="flex flex-col items-center bg-white">
            <Title>新規応募</Title>
            <div className="text-black">
                <Input title="企画名" must={true} value={programName} onChange={setProgramName} type="text" className="w-full mb-10" inputClassName="w-96" />
                <Input title="説明文" must={true} value={detail} onChange={setDetail} type="text" className="w-full mb-10" inputClassName="w-96" />
                <Pulldown title="参加枠" must={true} value={type} onChange={setType} datas={types} className="w-full mb-10" isOpen={openPulldown === 1} onToggle={() => handlePulldownToggle(1)} />
                <Pulldown title='企画区分' must={true} value={detailType} onChange={setDetailType} datas={type === '教室企画' ? roomTypes : type === '屋外ステージ企画' ? stageTypes : type === '模擬店企画' ? storeTypes : []} className="w-full mb-10" isOpen={openPulldown === 2} onToggle={() => handlePulldownToggle(2)} />
                <Pulldown title='時間（分）' must={true} value={time} onChange={setTime} datas={times} className={`w-full mb-10 ${type === '屋外ステージ企画' ? "" : "hidden"}`} isOpen={openPulldown === 3} onToggle={() => handlePulldownToggle(3)} />
                <Input title="コラボ団体" value={collaboration} onChange={setCollaboration} type="text" className="w-full mb-10" inputClassName="w-96" />
                <div className="flex justify-between items-center w-full mb-10">
                    <p>優先企画</p>
                    <Switch defaultSelected isSelected={priority} onValueChange={setPriority} size="lg" />
                </div>
                <div className="flex justify-between items-center w-full mb-10">
                    <p>新規優先企画</p>
                    <Switch defaultSelected isSelected={newProject} onValueChange={setNewProject} size="lg" />
                </div>
            </div>
            <MainButton className="w-32 mb-10" title="応募" onClick={() => {apply()}} />
        </div>
    )
}