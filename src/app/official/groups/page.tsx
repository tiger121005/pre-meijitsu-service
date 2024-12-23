import AllGroups from "@/components/AllGroups"
import { OfficialSideMenu } from "@/components/SideMenu"
import Title from "@/components/texts/Title"

export default function Page() {
    return (
        <div className="flex">
            <OfficialSideMenu />
            <div className="bg-white w-full">
                <Title>団体一覧</Title>
                <AllGroups />
            </div>
        </div>
    )
}