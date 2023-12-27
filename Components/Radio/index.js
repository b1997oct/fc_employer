import { useId } from 'react'

export default function Radio({ label, value, checked, name, onChange, className}) {
    const id = useId()

    return (
        <div className={`df gap-2 ${className}`}>
            <input
                type='radio'
                name={name}
                checked={value === checked}
                value={value}
                onChange={onChange}
                id={id}

            />
            <label htmlFor={id} className='bold'>{label}</label>
        </div>
    )
}
