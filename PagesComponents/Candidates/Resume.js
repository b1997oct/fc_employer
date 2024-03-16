import Collapse from '@/Components/Collapse'
import CollapeArrow from '@/Components/Collapse/CollapeArrow'
import { Article } from '@/Components/Icons'
import React, { useState } from 'react'

export default function Resume({ resume }) {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <div onClick={() => setOpen(!open)} className='df jcsb pointer'>
                <h2 className='df aic gap-2'><Article /> Resume</h2>
                <CollapeArrow open={open} />
            </div>
            <Collapse open={open}>
                <br />
                <iframe
                    style={{ height: '80vh' }}
                    className='w-full'
                    src={resume} />
            </Collapse>
        </div>
    )

}
