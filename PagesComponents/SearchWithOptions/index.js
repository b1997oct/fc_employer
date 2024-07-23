import ClickAwayListener from "@/UW/ClickAwayListener"
import { ExpandMore } from "@/UW/Icons"
import Radio from "@/UW/Input/Radio"
import Tggr from "@/UW/JS/Trigger"
import SearchBar from "@/UW/SearchBar"
import { useState } from "react"

export default function SearchWithOptions({ name, resetPagination }) {

    let [open, setOpen] = useState(false),
        handle = val => () => {
            setOpen(false)
            resetPagination({ name: val })
        },
        handler = val => ({ onClick: handle(val), className: 'p-2 w-full border-t hover', checked: name == val })


    return <div className="w-full df">
        <div className="relative min-w-24">
            <div className="pl-2 h-full pointer df jcsb aic border bg capitalize" onClick={Tggr(setOpen, !open)}>
                {name} <span className={`${open ? '-rotate-180' : ''} duration-200`}><ExpandMore /></span>
            </div>
            {open &&
                <ClickAwayListener onClickAway={setOpen} className={`absolute duration-300 bg w-full shadow-md z-[100] top-full rounded`}>
                    <Radio {...handler('name')} >Name</Radio>
                    <Radio {...handler('email')} >Email</Radio>
                    <Radio {...handler('mobile')} >Mobile</Radio>
                    <div className="w-full ce pr-2 df jce"><span onClick={handle('name')} className="pointer">Reset</span></div>
                </ClickAwayListener>}
        </div>
        <SearchBar onChange={e => resetPagination({ name, value: e.target.value })} placeholder='Search' />
    </div>
}