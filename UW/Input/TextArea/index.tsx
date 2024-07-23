import React, { useId, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    touched: boolean;
    nowrap: boolean;
    errorText: string;
}

export default function TextArea({
    label,
    touched,
    className = '',
    errorText,
    nowrap = true,
    onChange,
    ...props
}: Props) {

    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(errorText) || touched && Boolean(errorText)

    const handleChange = e => {
        let { value } = e.target
        if (nowrap) {
            e.target.value = value?.replaceAll('\n', '')
        }
        onChange(e)
    }

    return (
        <div className={`mt-2 ${err ? 'error' : ''}`} >
            <label htmlFor={id}>{label}</label>
            <ReactTextareaAutosize
                id={id}
                className={`input resize-none ${className}`}
                onChange={handleChange}
                onBlur={() => setB(true)}
                {...props}
            />
            {err && <div className="ce">{errorText}</div>}
        </div>
    )
}



