'use client'

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type PulldownProps = {
    title: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    datas: string[];
    className?: string;
    inputClassName?: string;
    isOpen: boolean;
    must?: boolean;
    onToggle: () => void;
}

export default function Pulldown({ value, onChange, datas, className, isOpen, onToggle, title, must }: PulldownProps) {
    const pulldownRef = useRef<HTMLDivElement>(null);

    function handleSelectChange(select: string) {
        onChange(select)
        onToggle();
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pulldownRef.current && !pulldownRef.current.contains(event.target as Node)) {
                onToggle();
            }   
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onToggle])

    return (
        <div className={`flex justify-between items-center text-black ${className}`}>
            <div className="pr-10 w-fit">{title}{must && <span className="text-red-500"> *</span>}</div>
            <div ref={pulldownRef} className={`h-10 `}>
                <div role="group">
                    <button
                        type="button"
                        aria-controls="contents"
                        aria-expanded={isOpen}
                        onClick={onToggle}
                        className="flex border-2 rounded-md p-1 h-10 gap-2 items-center justify-between w-96 max-w-full"
                    >
                        <p>{value}</p>
                        <AnimatePresence>
                            <motion.div
                                animate={isOpen ? "open" : "closed"}
                                variants={{
                                    open: { rotate: 180 },
                                    closed: { rotate: 0 },
                                }}
                            >
                                <Image src="/assets/images/svg/triangle-primary.svg" alt="" width={13} height={13} />
                            </motion.div>
                        </AnimatePresence>
                    </button>
                    <div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0, transition: { delay: 0, duration: 0.25 } }}
                                    transition={{ duration: 0.25 }}
                                    className="relative flex flex-col items-start bg-gray-400 rounded-xl w-96 max-w-full p-3 mt-2 overflow-hidden z-10"
                                >
                                    {datas.map((data) => (
                                        <button key={data} onClick={() => handleSelectChange(data)} className="w-full text-start hover:bg-gray-500 rounded-md">
                                            <div className="flex w-10, h-8 absolute items-center">
                                                {data === value && <Image src="/assets/images/svg/check-accent.svg" alt="✔︎" width={20} height={20} className="text-accent w-5 h-5" />}
                                            </div>
                                            <p className="flex items-center h-8 align-middle pl-8">{data}</p>
                                        </button>

                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}