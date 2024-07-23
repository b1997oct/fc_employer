import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

export default function Tab({ active, className = '', ...props }: Props) {
    const cn = `rounded-none px-0 whitespace-nowrap ${active ? 'border-b-4 border-b-[rgb(var(--pc))] cp' : ''} ${className}`
    return <button className={cn} {...props} />
}