import Backdrop from '@/UW/Backdrop'
import Tggr from '@/UW/JS/Trigger'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

let modal
export default function TopModal({ open, onClose, children }) {

    useEffect(() => {
        modal = document.getElementById('modal')
    }, [])

    if (!modal) return

    return createPortal(
        <div className={`fixed top-0 z-[100] jcc w-full ${open ? 'df' : 'hidden'}`}>
            <div className={`rounded-b-[16px] bg-stone-100 shadow-2xl relative z-[101] w-full duration-300 slide max-w-2xl ${open ? '-translate-y-full' : 'translate-y-full'}`}>
                {children}
            </div>
            <Backdrop onClick={Tggr(onClose)} className='fixed bg-black/60 ' />
        </div>, modal)

}
