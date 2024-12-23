type InputProps = {
    title: string;
    value: string;
    type: string;
    onChange: (value: string) => void;
    className?: string;
    must?: boolean;
    inputClassName?: string;
}

export default function Input({title, value, type, onChange, className, inputClassName, must}: InputProps) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <p className="pr-10 w-fit text-black">{title}{must && <span className="text-red-500"> *</span>}</p>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`border border-gray-300 rounded-md p-1 text-black ${inputClassName}`}
            />
        </div>
    )
}