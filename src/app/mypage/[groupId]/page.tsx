import SideMenu from "@/components/SideMenu";
import Title from "@/components/texts/Title";

export default function Page() {
    return (
        <div className="flex">
            <SideMenu />
            <div className="bg-white w-full">
                <Title>My Page</Title>
            </div>
        </div>
    )
}