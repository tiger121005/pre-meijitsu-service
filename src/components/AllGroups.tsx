import Link from "next/link";
import { getAllGroups } from "../../utils/supabase/groupActions";
import { GroupType } from "@/types/group";

export default async function AllGroups() {
    const datas = await getAllGroups().then((data) => {console.log(data); return data});
    return (
        <div className="text-black flex flex-col items-center">
            <div className="flex flex-col gap-3">
                {datas?.map((data: GroupType) => (
                    <GroupCard key={data.id} id={data.id} name={data.name} auth_id={data.auth_id} email={data.email} type={data.type} insta={data.insta} x={data.x} tiktok={data.tiktok} hp={data.hp} />
                ))}
            </div>
        </div>
    )
}

function GroupCard({ id, name, auth_id, email, type, insta, x, tiktok, hp }: GroupType) {
    return (
        <Link href={`/official/groups/group?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&auth_id=${encodeURIComponent(auth_id)}&email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}&insta=${encodeURIComponent(insta ?? "")}&x=${encodeURIComponent(x ?? "")}&tiktok=${tiktok ?? ""}&hp=${encodeURIComponent(hp ?? "")}`}>
            <div className="border-2 border-gray-400 p-3 rounded-md">
                <CardRow title="団体名">{name}</CardRow>
                <CardRow title="団体区分">{type}</CardRow>
            </div>
        </Link>
    )
}

function CardRow({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex">
            <p className="w-28">{title}</p>
            <p>{children}</p>
        </div>
    )
}