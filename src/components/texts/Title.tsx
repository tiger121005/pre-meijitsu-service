import { ReactNode } from "react"

type TitleProps = {
    children: ReactNode
}

export default function Title({ children }: TitleProps) {
    return (
        <h1 className="text-center text-3xl py-20 font-bold text-black">
            {children}
        </h1>
    )

}