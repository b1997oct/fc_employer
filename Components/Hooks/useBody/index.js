import { useTheme } from '@/Layout/Theme'
import { useEffect } from 'react'

export default function useBody(open) {
    const { width } = useTheme()
    useEffect(() => {
        const { scrollHeight, clientHeight } = document.body
        if (open) {
            document.body.style = `overflow:hidden; ${width && scrollHeight > clientHeight ? 'padding-right:16px;' : ''}`
        } else {
            document.body.style = ''
        }
    }, [open])
}
