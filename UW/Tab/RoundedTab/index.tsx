import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

export default function RoundedTab({ active, className = '', ...props }: Props) {
    let cn = `border-2 px-6 py-1 rounded-full border-[rgba(var(--pc),.1)] cp ${active ? 'bg-[rgba(var(--pc,),.1)]' : ''}`

    return <button className={`${cn} ${className}`} {...props} />
}
