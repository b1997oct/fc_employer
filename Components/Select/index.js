import { useId, useState } from 'react'


export default function Select({ options = [], value, name, onChange, label, placeholder, readOnly }) {

    const [open, setOpen] = useState(false)
    const id = useId()

    return (
        <div className='relative w-full'>
            <label htmlFor={`hc-${id}`} className='bold'>{label}</label>
            <input
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 250)}
                className='input mt-2'
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                name={name}
                readOnly={readOnly}
            />
            {open &&
                <div className='bg py-1 scroll fadeIn absolute w-full rounded-sm border' style={{ maxHeight: 200, zIndex: 9, }}>
                    {options.filter(d => d.toLowerCase().includes(value.toLowerCase())).map((dat, i) => {
                        const selected = value === dat ? 'menu-selected' : ''
                        return (
                            <div
                                role='button'
                                key={i}
                                className={`menu p-2 ${selected}`}
                                onClick={() => onChange && onChange({ target: { name, value: dat } })}>
                                {dat}
                            </div>)
                    })}
                </div>
            }
        </div>
    )
}




export function StaticSelect({ label, name, value, onChange, children, active, error, errorText }) {
    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(error) || active && Boolean(error)
    return (
        <div>
            <label className='bold' htmlFor={id}>{label}</label>
            <select
                name={name}
                className='input mt-2'
                value={value}
                onChange={onChange}
                id={id}
                onBlur={() => setB(true)}
            >
                {children}
            </select>
            {err && <div className="mt-1 mx-2 error-text">{errorText}</div>}
        </div>)
}
