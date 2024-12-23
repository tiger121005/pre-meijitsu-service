'use client'

import MainButton from "@/components/button/MainButton";
import SideMenu from "@/components/SideMenu";
import Title from "@/components/texts/Title";
import { getGroup, logout } from "../../../../../utils/supabase/groupActions";
import Input from "@/components/Input";
import Pulldown from "@/components/Pulldown";
import { useEffect, useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [insta, setInsta] = useState("");
    const [x, setX] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [hp, setHp] = useState("");

    const groupId = getGroupId();

    const [openPulldown, setOpenPulldown] = useState<number | null>(null);

    const types = ['公認団体', '学内団体', '学外団体'];

    function handlePulldownToggle(pulldownIndex: number) {
        setOpenPulldown(openPulldown === pulldownIndex ? null : pulldownIndex);
    }

    useEffect(() => {
        if (!groupId) return;
        getGroup(groupId).then((group) => {
            if (group) {
                setName(group.name);
                setType(group.type);
                setInsta(group.insta ?? "");
                setX(group.x ?? "");
                setTiktok(group.tiktok ?? "");
                setHp(group.hp ?? "");
                console.log(group);
            }
        })
    }, [])

    function getGroupId(): number {
        const url = new URL(window.location.href);
        const groupId = url.pathname.split('/')[2];
        return Number(groupId);
    }

    return (
        <div className="flex overflow-hidden h-screen">
            <SideMenu />
            <div className="flex flex-col items-center bg-white w-full overflow-auto">
                <Title>団体設定</Title>
                <div>
                    <Input title="団体名" must={true} value={name} onChange={setName} type="text" className="w-full mb-10" inputClassName="w-96" />
                    <Pulldown title="団体区分" must={true} datas={types} value={type} onChange={setType} className="w-full mb-10" isOpen={openPulldown === 1} onToggle={() => handlePulldownToggle(1)} />
                    <Input title="インスタグラム" value={insta} onChange={setInsta} type="text" className="w-full mb-10" inputClassName="w-96" />
                    <Input title="X" value={x} onChange={setX} type="text" className="w-full mb-10" inputClassName="w-96" />
                    <Input title="Tiktok" value={tiktok} onChange={setTiktok} type="text" className="w-full mb-10" inputClassName="w-96" />
                    <Input title="HP" value={hp} onChange={setHp} type="text" className="w-full mb-10" inputClassName="w-96" />
                </div>
                <MainButton title="保存" onClick={() => { }} className="my-10 w-40" />
                <div className="bg-red-200 w-11/12 rounded-md m-3 mt-20 flex justify-center border-red-500 border-4">
                    <MainButton title="ログアウト" onClick={logout} danger={true} className="my-10 w-40" />
                </div>
            </div>
        </div>
    )
}