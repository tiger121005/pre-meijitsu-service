type TextButtonProps = {
    title: string;
    onClick: () => void;
    className?: string;
}

export default function TextButton({title, onClick, className}: TextButtonProps) {
    return (
        <button onClick={onClick} className={`text-blue-500 hover:underline ${className}`}>{title}</button>
    )
}