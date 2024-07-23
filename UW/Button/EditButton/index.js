'use client'
import { DriveFileRenameOutline } from "@/UW/Icons"

export default function EditButton({ value, onClick, size=24 }) {
    return (
        <button
            onClick={() => {
                onClick && onClick(value)
            }}
            className='icon-btn p'>
            <DriveFileRenameOutline size={size} />
        </button>
    )
}

