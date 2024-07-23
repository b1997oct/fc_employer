'use client'

import { Close } from "@/UW/Icons"

export default function ModalTitle({ children, value, onClose, className = '', }) {
    return (
        <div className={'df jcsb border-b p-2 md:pr-4 bg z-10 ' + className}>
            {typeof onClose != 'undefined' &&
                <button className='icon-btn aic order-1 md:order-none' disabled={!Boolean(onClose)} onClick={() => onClose(value)}>
                    Close <Close size={20} />
                </button>}
            {children}
        </div>
    )
}
