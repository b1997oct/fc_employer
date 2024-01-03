import { useId, useState } from 'react'
import { Close } from '../Icons'
import ClickAwayListener from '../ClickAwayListener'


export default function Select({ options = [], value = '', name, onChange, label, placeholder, multiple, readOnly }) {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const id = useId()

    function handleChange(e) {
        setData(e.target.value)
        !multiple && onChange(e)
    }

    const focus = () => document.getElementById(id).focus()

    function reset() {
        setData(null)
        onChange({ target: { name, value: '' } })
        focus()
    }

    const search = options.filter(d => d.trim().toLowerCase().includes((data || '').trim().toLowerCase()))
    if (data && !search.length) {
        search.push(`Add new "${data}"`)
    }

    return (
        <div className='relative w-full'>
            <label htmlFor={id} className='bold'>{label}</label>
            {multiple}
            <ClickAwayListener
                onClickAway={() => setOpen(false)}
                className='relative'>
                <input
                    id={id}
                    onFocus={() => setOpen(true)}
                    onBlur={() => typeof data === 'string' && setTimeout(() => setData(null), 200)}
                    className='input mt-2'
                    onChange={handleChange}
                    value={typeof data === 'string' ? data : value}
                    placeholder={placeholder}
                    name={name}
                    readOnly={readOnly}
                    autoComplete='off'
                />
                {value &&
                    <button
                        onClick={reset}
                        style={{ right: 8, top: '20%', borderRadius: 4 }}
                        className='absolute icon-btn'>
                        <Close />
                    </button>}
                {open &&
                    <div
                        className='bg py-1 scroll mt-1 absolute w-full rounded-sm shadow-sm'
                        style={{ maxHeight: 200, zIndex: 9, }}>
                        {search.length ?
                            search.map((dat, i) => {
                                const selected = value === dat ? 'menu-selected' : ''
                                return (
                                    <div
                                        key={i}
                                        role='button'
                                        className={`menu p-2 ${selected}`}
                                        onClick={() => {
                                            setData(null)
                                            if (multiple) {
                                                onChange(dat)
                                                focus()
                                            } else {
                                                onChange && onChange({ target: { name, value: dat } })
                                                setOpen(false)
                                            }
                                        }}>
                                        {dat}
                                    </div>)
                            }) : <p className='px'>No Result found</p>}
                    </div>
                }
            </ClickAwayListener>
        </div>
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
