import React, { useId, useState } from 'react'
import SpanInput from './SpanInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    touched: boolean
    span: any;
    errorText: string
    inputClass: string
}

export default function Input({
    label,
    touched,
    inputClass = '',
    className = '',
    errorText,
    onChange,
    ...props
}: Props) {

    const [b, setB] = useState(false)
    const id = useId()
    const err = (b || touched) && Boolean(errorText)
    const handleChange = e => {
        let { type, value } = e.target
        if (type === 'tel') {
            e.target.value = parseInt(value) || ''
        }
        onChange(e)
    }

    return (
        <div className={`mt-2 ${err ? 'error' : ''} ${className}`} >
            <label htmlFor={id}>{label}</label>
            {props.span ?
                <SpanInput
                    {...props}
                    id={id}
                    onChange={handleChange}
                    className={inputClass}
                    onBlur={() => setB(true)}
                />
                :
                <input
                    id={id}
                    onChange={handleChange}
                    className={inputClass}
                    onBlur={() => setB(true)}
                    {...props} />}

            {err && <div className="ce">{errorText}</div>}
        </div>
    )
}



