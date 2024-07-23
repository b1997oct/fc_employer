import React, { useId } from "react"


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode
}

export default function Checkbox({ children, className, label, ...props }: Props) {

    const id = useId(),
        cn = className || 'accent-orange-500'

    return (
        <div className="df aic gap-2">
            <input type="checkbox" id={id} className={cn} {...props} />
            <label htmlFor={id} className="cursor-pointer">{label || children}</label>
        </div>
    )
}

