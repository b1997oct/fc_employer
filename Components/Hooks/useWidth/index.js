import { useEffect, useState } from 'react'

export default function useWidth(sm, md) {

    const [width, setWidth] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 768);
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    if (sm && !width) {
        return sm
    } else if (md && width) {
        return md
    }
    return width
}
