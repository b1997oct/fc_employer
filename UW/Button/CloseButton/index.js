'use client'
import { Close } from "@/Components/Icons";

export default function CloseButton({ onClick, value }) {
    return (
        <button
            className='icon-btn'
            disabled={!onClick}
            onClick={() => onClick(value)}>
            <Close size={32} />
        </button>
    )
}
