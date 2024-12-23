import Link from "next/link"
import { ReactNode } from "react"

type MainLinkButtonProps = {
    children: ReactNode
    href: string
    external?: boolean
    className?: string
}

export default function MainButton({ children, href, className, external }: MainLinkButtonProps) {
    return (
        <Link href={href} target={external ? '_blank' : '_self'} className={`bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md text-center ${className}`}>{children}</Link>
    )
}