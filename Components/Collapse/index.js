import { useEffect, useRef } from "react"

export default function Collapse({ open, className, children }) {

    const container = useRef()
    const t = useRef()
    const { scrollHeight } = container.current || {}

    useEffect(() => {
        if (open) {
            clearTimeout(t.current)
            t.current = setTimeout(() => {
                container.current.style.overflow = 'auto'
            }, scrollHeight)
        } else {
            container.current.style.overflow = 'hidden'
        }
    }, [open])


    const style = {
        height: open ? scrollHeight : 0,
        transition: `all ${scrollHeight}ms linear`
    }

    return (
        <div
            ref={container}
            style={style}
            className={className}>
            {children}
        </div>
    )
}
