type MainButtonProps = {
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    danger?: boolean;
}

export default function MainButton({title, onClick, className, disabled, danger}: MainButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`${danger ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white p-2 rounded-md ${className}`}>{title}</button>
    )
}