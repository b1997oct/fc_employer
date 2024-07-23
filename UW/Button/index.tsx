import React from "react";

let colors = {
    fill: {
        primary: 'hover:cp hover:bg-transparent border-2 border-pc bold bg-pc text-white active:opacity-50',
        error: 'bg-red-500 active:bg-red-400 hover:bg-red-600 text-white',
    },
    outlined: {
        primary: 'text-blue-500 active:bg-blue-100/70 border border-blue-400 hover:bg-blue-50',
        error: 'text-red-500 active:bg-red-100/70 border border-red-400 hover:bg-red-50'
    }
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variant: 'fill' | 'outlined' | 'soft' | 'text';
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}
export default function Button({ className = '', variant = 'fill', color = 'primary', ...p }: Props) {
    let cn = ` ${colors[variant][color]} ${className}`
    return <button {...p} className={cn} />
}