import { useEffect } from 'react'

let width
export default function useBody(open) {
    useEffect(() => {
        if (typeof width !== 'boolean') {
            width = window.innerWidth > 768
        }
        if (open) {
            document.body.style = `overflow:hidden; ${width ? 'padding-right:16px;' : ''}`;
        } else {
            document.body.style = '';
        }
    }, [open])
}
