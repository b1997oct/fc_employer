'use client'
import React, { useId } from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Switch({ className, label, ...props }: Props) {
    const id = useId()
    const cn = className || 'peer-checked:bg-sky-600'

    return (
        <div>
            <div className="my-2">{label}</div>
            <input
                type="checkbox"
                hidden
                className="peer"
                id={id}
                {...props}
            />
            <label htmlFor={id} className={`${cn} peer-checked:before:translate-x-full df aic h-6 w-10 pointer rounded-full bg-gray-300 p-1 transition-colors before:h-4 before:w-4 before:rounded-full before:bg-white before:duration-300`} />
        </div>
    )
}