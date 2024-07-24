import React, { useId } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    th: boolean
}

export default function TableCheckBox({ className, th, children, ...props }: Props) {

    const cn = className || 'accent-orange-400',
        id = useId()
    return (
        <td className={`${th ? 'th' : ''}`}>
            <div className='df jcc aic fdc gap-1'>
                <input type="checkbox" id={id} className={cn}  {...props} />
                {children}
            </div>
        </td>)
}
