'use client'

import Row from "@/components/texts/Row";
import Title from "@/components/texts/Title"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

function Content() {

    const params = useSearchParams();
    const title = params.get("title");
    const detail = params.get("detail");
    const type = params.get("type");
    const detailType = params.get("detailType");
    const time = params.get("time");
    const collaboration = params.get("collaboration");
    const groupName = params.get("groupName");
    const priority = params.get("priority");
    const newProject = params.get("newProject");

    return (
        <div className="bg-white text-black">
            <Title>応募情報</Title>
            <div className="flex flex-col items-center">
                <Row title="タイトル">{title}</Row>
                <Row title="詳細">{detail}</Row>
                <Row title="">{type}</Row>
                <Row title="詳細種別">{detailType}</Row>
                <Row title="企画実施時間">{time}分</Row>
                <Row title="コラボ団体">{collaboration}</Row>
                <Row title="団体名">{groupName}</Row>
                <Row title="優先企画">{priority}</Row>
                <Row title="新規優先企画">{newProject}</Row>
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