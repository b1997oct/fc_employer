import { Close } from '@mui/icons-material'
import { Drawer } from '@mui/material'
import { useRouter } from 'next/router'

export default function EditDrawer({ update, onClose, children }) {

    const r = useRouter()
    const open = typeof r.query.drawer === 'string'

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <div className='m'>
                <button onClick={onClose} className='icon-btn'>
                    <Close />
                </button>
                {update && <div className='p-2 bg-text sbg rounded-sm'>Please Review and Update</div>}
            </div>
            {children}
        </Drawer>
    )
}

export function useDrawer() {
    const r = useRouter()
    const togle = (data='open') => {
        if (r.query.drawer) {
            r.replace({ href: r.pathname }, undefined, { scroll: false })
        } else {
            r.push(`?drawer=${data}`,undefined, { scroll: false })
        }
    }

    return togle

}  
