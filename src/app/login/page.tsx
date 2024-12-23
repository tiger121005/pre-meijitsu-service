'use client'

import MainButton from "@/components/button/MainButton";
import Input from "@/components/Input";
import Title from "@/components/texts/Title";
import { useState } from "react";
import LinkButton from "@/components/button/LinkButton";
import { login } from "../../../utils/supabase/groupActions";
import { saveGroupName } from "../../../utils/client/localStorage";
import { redirect } from "next/navigation";

export default function Page() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function signin() {
        login(email, password).then((data) => {
            saveGroupName(data.name);
            if (data.authId === "1bfa0ee7-7446-44d3-9784-f36c75516e41") {
                redirect('/official');
            } else {
                redirect(`/mypage/${data.id}`);
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <Title>ログイン（テスト）</Title>
            <div>
                <Input title="メールアドレス" must={true} value={email} onChange={setEmail} type="email" className="w-full mb-10" inputClassName="w-96" />
                <Input title="パスワード" must={true} value={password} onChange={setPassword} type="password" className="w-full mb-20" inputClassName="w-96" />
            </div>
            <div className="flex flex-col items-center">
                <MainButton className="w-32 mb-10" title="ログイン" onClick={signin} />
                <LinkButton title="新規登録" href="/signup" />
            </div>
        </div>
    )
}