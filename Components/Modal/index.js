import { useTheme } from "@/Layout/Theme"
import useBody from "../Hooks/useBody"

export default function Modal({ open, onClose, className, children }) {

    open = Boolean(open)

    useBody(open)

    const { width } = useTheme()

    return (
        <div
            style={{ zIndex: 1000 }}
            className={`backdrop ${open ? 'df' : 'none'} jcc aic`}>
            <div
                role='button'
                className='backdrop'
                style={{
                    zIndex: 400,
                    backgroundColor: '#0008',
                }}
                onClick={onClose}
            />
            <div style={{ zIndex: 401, maxWidth: width ? 550 : '90vw' }} className={`relative rounded-sm bg p ${className}`}>
                {children}
            </div>
        </div>
    )
}
