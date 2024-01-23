import { useState } from 'react'

export default function Tooltip({ content, children, style }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => !open && setOpen(true)}
      onMouseLeave={() => open && setOpen(false)}
      className='relative df jcc'
    >
      <div
        className={`tooltip ${open ? 'fadeIn' : 'toastOut'}`}
        style={style}
      >
        {content}
      </div>
      {children}
    </div>
  )
}
