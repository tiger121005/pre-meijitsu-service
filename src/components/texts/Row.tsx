type RowType = {
    children: React.ReactNode;
    title: string;
}

export default function Row({ children, title }: RowType) {
    return (
        <div className="w-full flex justify-center text-xl">
            <div className="bg-gray-400 w-0.5" />
            <p className="w-40 border-y-1 border-gray-400 p-2">{title}</p>
            <div className="bg-gray-400 w-0.5" />
            <p className="w-60 border-y-1 border-gray-400 p-2">{children}</p>
            <div className="bg-gray-400 w-0.5" />
        </div>
    )
}