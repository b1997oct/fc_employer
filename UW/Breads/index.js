import React from 'react'
import Back from '../Button/Back'
import Link from 'next/link'

export default function Breads({ links = [], label }) {
    return (
        <div className='df gap-2 truncate aic m'>
            <Back />/
            {links.map(d => {
                const { label, href } = d
                return <><Link href={href} key={href} className='a'>{label}</Link> / </>
            })}
            {label}
        </div>
    )
}
