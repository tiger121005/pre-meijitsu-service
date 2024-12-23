'use client'

import MainButton from "@/components/button/MainButton";
import Title from "@/components/texts/Title";
import { useRouter } from "next/navigation"

export default function Page() {
  const route = useRouter()
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <Title>参加団体管理サービス</Title>
      <div className="flex justify-center">
        <MainButton title="ログイン" onClick={() => (route.push("/login"))} />
      </div>
    </div>
  )
}