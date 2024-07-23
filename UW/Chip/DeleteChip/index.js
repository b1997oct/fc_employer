import { Close } from '@/UW/Icons'
import React from 'react'

export default function DeleteChip({ onDelete, className = '', children }) {
    const cn = onDelete ? 'pl df aic' : 'px py-0.5'
    return (
        <div className={`${cn} border border-black rounded-full ${className}`} >
            {children}
            {onDelete && <button className='p-1 rounded-full hover text-gray-600' onClick={onDelete}><Close size='22' /></button>}
        </div>
    )
}
