'use client'

import LinkButton from "@/components/button/LinkButton";
import Row from "@/components/texts/Row";
import Title from "@/components/texts/Title"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Suspense } from "react"

function Content() {

    const params = useSearchParams();
    const id = params.get("id");
    const name = params.get("name");
    const type = params.get("type");
    const email = params.get("email");
    const insta = params.get("insta");
    const x = params.get("x");
    const tiktok = params.get("tiktok");
    const hp = params.get("hp");

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <div className="bg-white text-black">
            <Title>応募情報</Title>
            <div className="flex flex-col items-center">
                <Row title="団体名">{name}</Row>
                <Row title="団体区分">{type}</Row>
                <Row title="メールアドレス">{email}</Row>
                <Row title="インスタグラム"><LinkButton title={insta ?? ""} href={insta ? `https://instagram.com/${insta}` : ""} external={true} /></Row>
                <Row title="X"><LinkButton title={x ?? ""} href={x ? `https://x.com/${x}` : ""} external={true} /></Row>
                <Row title="tiktok">{tiktok}</Row>
                <Row title="hp"><LinkButton title={hp ?? ""} href={hp ?? ""} external={true} /></Row>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content />
        </Suspense>
    )
}