'use client'

import Input from "@/components/Input"
import Pulldown from "@/components/Pulldown";
import Title from "@/components/texts/Title"
import { useState } from "react"
import MainButton from "@/components/button/MainButton"
import LinkButton from "@/components/button/LinkButton"
import { registerGroup } from "../../../utils/supabase/groupActions";
import { saveGroupName } from "../../../utils/client/localStorage";

export default function Page() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [insta, setInsta] = useState<string>("");
    const [x, setX] = useState<string>("");
    const [tiktok, setTiktok] = useState<string>("");
    const [hp, setHp] = useState<string>("");

    const [openPulldown, setOpenPulldown] = useState<number | null>(null)

    const types = ['公認団体', '学内団体', '学外団体'];

    function handlePulldownToggle(pulldownIndex: number) {
        setOpenPulldown(openPulldown === pulldownIndex ? null : pulldownIndex)
    }

    function signup() {
        console.log("signup");
        registerGroup(name, type, email, password, hp, insta, x, tiktok);
        saveGroupName(name);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <Title>参加団体登録（テスト）</Title>
            <div>
                <Input title="メールアドレス" must={true} value={email} onChange={setEmail} type="email" className="w-full mb-10" inputClassName="w-96" />
                <Input title="パスワード" must={true} value={password} onChange={setPassword} type="password" className="w-full mb-10" inputClassName="w-96" />
                <Input title="団体名" must={true} value={name} onChange={setName} type="text" className="w-full mb-10" inputClassName="w-96" />
                <Pulldown title="団体種別" must={true} value={type} onChange={setType} datas={types} className="w-full mb-10" isOpen={openPulldown === 1} onToggle={() => {handlePulldownToggle(1)}} />
                <Input className="w-full mb-10" inputClassName="w-96" title="Instagramアカウント" value={insta} type="text" onChange={setInsta} />
                <Input className="w-full mb-10" inputClassName="w-96" title="Xアカウント" value={x} type="text" onChange={setX} />
                <Input className="w-full mb-10" inputClassName="w-96" title="TikTokアカウント" value={tiktok} type="text" onChange={setTiktok} />
                <Input className="w-full mb-20" inputClassName="w-96" title="ホームページ URL" value={hp} type="text" onChange={setHp} />
            </div>
            <div className="flex flex-col items-center">
                <MainButton className="w-32 mb-10" title="登録" onClick={signup} />
                <LinkButton className="mb-40" title="ログイン" href="/login" />
            </div>
        </div>
    )
}