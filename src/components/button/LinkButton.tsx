import Link from "next/link"

type LinkButtonProps = {
    title: string;
    href: string;
    external?: boolean;
    className?: string;
}

export default function LinkButton({ title, href, className, external }: LinkButtonProps) {
    return (
        <Link href={href} target={external ? '_blank' : '_self'} className={`text-blue-500 hover:underline ${className}`}>{title}</Link>
    )
}