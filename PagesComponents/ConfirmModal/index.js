import React, { useState } from 'react'
import TopModal from '../TopModal'

export default function ConfirmModal() {

    let [open, setOpen] = useState()

    const onOk = () => {
        setOpen(false)
    }

    const onCacel = () => {
        setOpen(false)
        callback(false)
    }

    const comformModal = <TopModal open={open}>
        <div className='p'>
            {open}
            <div className='df gap'>
                <button onClick={onOk}>Ok</button>
                <button onClick={onCacel}>Cancel</button>
            </div>
        </div>
    </TopModal>

    return { setOpen, comformModal }
}
