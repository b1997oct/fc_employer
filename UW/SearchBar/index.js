import React, { useState } from 'react'
import { Search } from '../Icons'
import Tggr from '../JS/Trigger'

export default function SearchBar({ className = '', ...props }) {

    let [open, setOpen] = useState(false)

    return (
        <div className="relative w-full max-w-xl df">
            <input
                onFocus={Tggr(setOpen, true)}
                onBlur={Tggr(setOpen, false)}
                className={`rounded-r-none bg ${className}`} {...props}
            />
            <button className={`rounded-l-none border-l-0 border text-[rgba(var(--pc),.6)] bg-gray-100 aic ${open ? 'border-[rgb(var(--pc))]' : ''}`}>
                <span className="h-4 df aic"><Search size="32" /></span>
            </button>
        </div>
    )
}
