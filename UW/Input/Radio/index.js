import { useId } from 'react'

export default function Radio({ className, children, label, ...props }) {
    const id = useId()

    return (
        <div className={`df gap-2 ${className}`}>
            <input
                id={id}
                type="radio"
                {...props}
            />
            <label htmlFor={id}>{children || label}</label>
        </div>
    )
}


export function RadioGroup({ options, value, name, label, errorText, active, ...props }) {

    let err = active && errorText

    return <div className='mt'>
        {label}
        <div className='df gap fww mt-1'>
            {options.map(d => <Radio key={d} checked={value == d} name={name} value={d} label={d} {...props}>{d}</Radio>)}
        </div>
        {err && <div className='ce'>{errorText}</div>}
    </div>
}