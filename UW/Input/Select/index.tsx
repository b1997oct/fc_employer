import React, { useId, useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
    label: string;
    active: boolean;
    errorText: string;
    inputClass: string;
}

export default function Select({
    label,
    active,
    inputClass = '',
    className,
    errorText,
    ...props
}: Props) {

    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(errorText) || active && Boolean(errorText)

    return (
        <div className={`mt-2 ${err ? 'error' : ''} ${className}`} >
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                className={inputClass}
                onBlur={() => setB(true)}
                {...props}
            />
            {err && <div className="ce">{errorText}</div>}
        </div>
    )
}



