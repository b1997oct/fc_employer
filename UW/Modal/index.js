'use client'

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export default function Modal({ open, onClose, value, className = '', children }) {

    const close = () => onClose && onClose(value),
        ref = useRef()

    const cn = `z-[102] slide translate-y-full md:translate-y-0 md:translate-x-full max-h-[80vh] df fdc md:min-h-screen overflow-auto md:w-[40vw] bg-white rounded-t-3xl md:rounded-none w-full ${className}`

    useEffect(() => {
        ref.current = document.getElementById('modal')

    }, [open])

    if (ref.current && open) {
        return createPortal(
            <div className={open ? "backdrop fixed z-[101] df justify-stretch md:jce aie md:h-full" : 'hidden'}>
                <div className="backdrop fixed bg-black/60" onClick={close} />
                <div className={cn}>
                    {children}
                </div>
            </div>, ref.current)
    }

}
