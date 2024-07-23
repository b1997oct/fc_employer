import { Close } from '@/UW/Icons'
import React, { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onReset?: () => void;
}

const ClearInput = forwardRef<HTMLInputElement, Props>(({ onReset, className, value, ...props }, ref) => {
    
    return (
        <div className='relative w-full'>
            <input
                autoComplete='off'
                className={`w-full ${className}`}
                {...props}
                ref={ref}
            />
            {onReset &&
                <button onClick={onReset} className='icon-btn mt-3 absolute right-2'>
                    <Close  size={20} />
                </button>}
        </div>
    )
})

export default ClearInput