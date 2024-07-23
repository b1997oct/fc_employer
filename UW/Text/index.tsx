import React from 'react'

export default function Text({ className = '', ...props }: React.HtmlHTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={`text-orange-500 ${className}`} {...props} />
    )
}
