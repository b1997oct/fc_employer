import { useEffect, useRef } from "react"


export default function Collapse({ open, className='', children }) {
    const container = useRef()
    const t = useRef()

    const { scrollHeight } = container.current || {}

    useEffect(() => {

        container.current.style.transition = `all ${scrollHeight}ms linear`
        container.current.style.height = open ? scrollHeight + 'px' : 0
        container.current.style.overflow = 'hidden'

        if (open) {
            clearTimeout(t.current)
            t.current = setTimeout(() => {
                container.current.style.overflow = 'auto'
            }, scrollHeight)
        }
    }, [open])

    return (
        <div ref={container} className={'small-scrollbar ' + className}>
            {children}
        </div>
    )
}
