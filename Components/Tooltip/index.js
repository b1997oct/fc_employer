import {  useState } from 'react'

export default function Tooltip({ content, children }) {

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };




  return (
    <div
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      className='relative df jcc'
    >
      {children}
      {open && (
        <div
         
          style={{ top:-36, zIndex: 99 }}
          className='absolute p-2 text-bg rounded-sm shadow-sm'
        >
          {content}
        </div>
      )}
    </div>
  )
}
