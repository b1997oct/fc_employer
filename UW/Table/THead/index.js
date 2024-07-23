import React from 'react'

export default function THead({ className, ...props }) {
    return <tr className={`sticky top-0 z-50 ${className}`} {...props} />
}
