import { green_btn, orange_btn } from '@/UW/Button/colors'
import React from 'react'

export default function FooterButtons({ error, onCancel, onSubmit, disabled }) {
    return <>
        {error && <div className="ce truncate mb-2">{error}</div>}
        <div className='df jce gap'>
            <button onClick={onCancel} disabled={disabled} className={orange_btn.text + ' w-full'}>
                Cancel
            </button>
            <button onClick={onSubmit} disabled={disabled} className={green_btn.filled + ' w-full'}>
                SAVE
            </button>
        </div>
    </>
}
