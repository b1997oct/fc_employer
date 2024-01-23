import { useId, useState } from 'react'
import { Cancel } from '../Icons'
import ClickAwayListener from '../ClickAwayListener'


export default function Select({ options, value = '', name, onChange, label, placeholder, multiple, readOnly, active, open, setOpen, errorText, ...props }) {

    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(errorText) || active && Boolean(errorText)

    function reset() {
        onChange({ target: { name, value: '' } })
        document.getElementById(id)?.focus()
    }

    return (
        <div className='relative w-full'>
            <label htmlFor={id} className='bold'>{label}</label>
            {multiple}
            <ClickAwayListener
                value={false}
                onClickAway={setOpen}
                className='relative'>
                <input
                    id={id}
                    onFocus={() => setOpen(true)}
                    className='input mt-2'
                    autoComplete='off'
                    onBlur={() => !b && setB(true)}
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    {...props}
                />
                {!readOnly && value &&
                    <button onClick={reset} className='auto-complete-close'>
                        <Cancel />
                    </button>}
                {open &&
                    <div className='auto-complete-container'>
                        {options}
                    </div>}
            </ClickAwayListener>
            {err && <div className="mt-1 mx-2 ce">{errorText}</div>}
        </div>
    )
}


export function Option({ onClick, className, value, ...props }) {
    return <div role='button' className={`menu p-2 ${className}`} onClick={() => onClick(value)} {...props} />
}


export function SelectReadOnly({ label, name, value, onChange, options = [], multiValue, active, placeholder, errorText, disabled }) {

    const [open, setOpen] = useState(false)
    const onClick = (val) => {
        onChange({ target: { name, value: val } })
        setOpen(false)
    }

    const ops = options.map((d, i) => {
        let cn
        if (typeof value === 'string' && value === d || multiValue && multiValue.includes(d)) {
            cn = 'menu-selected'
        }
        return (
            <Option
                key={i}
                value={d}
                className={cn}
                onClick={onClick}
            >
                {d}
            </Option>)
    })

    return (
        <Select
            setOpen={setOpen}
            open={open}
            label={label}
            active={active}
            errorText={errorText}
            name={name}
            value={value}
            readOnly={true}
            placeholder={placeholder}
            options={ops}
            disabled={disabled}
        />
    )
}

export function StaticSelect({ label, name, value, onChange, children, active, error, errorText }) {
    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(error) || active && Boolean(error)
    return (
        <div className={`${err ? 'error' : ''}`}>
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
            {err && <div className="mt-1 mx-2 ce">{errorText}</div>}
        </div>)
}
