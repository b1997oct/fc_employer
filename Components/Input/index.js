import { useId, useState } from 'react'

export default function Input({ label, value, name, active, error, className = '', errorText, onChange, placeholder, style, ...props }) {
    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(error) || active && Boolean(error)
    return (
        <div style={style} className={`${err ? 'error' : ''} ${className}`} >
            <label htmlFor={id} className='bold'>{label}</label>
            <input
                id={id}
                value={value}
                onChange={onChange}
                className='input mt-2'
                placeholder={placeholder}
                name={name}
                onBlur={() => setB(true)}
                {...props}
            />
            {err && <div className="mt-1 mx-2 ce">{errorText}</div>}
        </div>
    )
}



