'use client'
import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from '../ClickAwayListener'
import ClearInput from '../Input/ClearInput'
import { serverHintFn } from '@/server'


export default function AutoPrediction({
    value,
    hintFn,
    body,
    onChange,
    Popper,
    className,
    inputClass = 'f-1 input',
    ...props
}) {

    const [open, setOpen] = useState(0)
    const [data, setData] = useState([])
    let getHints = serverHintFn(hintFn)
    const inputRef = useRef()

    if (!Boolean(open) && inputRef.current) {
        inputRef.current.value = value || ''
    }

    const keyword = inputRef.current?.value

    useEffect(() => {
        predicts()
    }, [keyword])

    async function predicts() {
        try {
            let res = await getHints(open < 2 ? '' : keyword)
            setData(res ?? [])
        } catch (error) {
            console.log('error: ', error.message);
        }
    }

    const reset = () => {
        inputRef.current.value = ''
        inputRef.current.focus()
        setOpen(1)
    }, handle = () => setOpen(open + 1),
        onAction = val => {
            if (val) {
                const name = props.name
                onChange({ target: { name, value: val } })
            }
            setOpen(0)
        }

    return (
        <ClickAwayListener
            value={0}
            onClickAway={setOpen}
            className={`relative autocomplete-container ${className}`} >
            <ClearInput
                onReset={keyword && reset}
                onFocus={() => setOpen(1)}
                className={inputClass}
                ref={inputRef}
                onChange={handle}
                {...props}
            />
            {open > 0 &&
                <div className='absolute z-[1000] autocomplete-popper'>
                    <Popper data={data} value={keyword} onAction={onAction} />
                </div>}
        </ClickAwayListener>
    )
}
