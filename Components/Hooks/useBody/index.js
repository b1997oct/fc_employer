import { useTheme } from '@/Layout/Theme'
import { useEffect } from 'react'

export default function useBody(open) {
    const { width } = useTheme()
    useEffect(() => {
        if (open) {
            document.body.style = `overflow:hidden; ${width ? 'padding-right:16px;' : ''}`
        } else {
            document.body.style = ''
        }
    }, [open])
}
