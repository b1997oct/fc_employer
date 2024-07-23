import React, { useRef, useState, useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import Tggr from '../JS/Trigger';

export default function Tooltip({ content, className = '', placement = 'auto-end', children }) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const popper = useRef(null);

  useEffect(() => {

    open && createPopper(container.current, popper.current, {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        }]
    });

  }, [open]);

  return (
    <div
      className={className}
      ref={container}
      onPointerEnter={Tggr(setOpen, true)}
      onPointerLeave={Tggr(setOpen, false)}>
      {open && <div ref={popper} className="border bg rounded shadow-lg text-sm p-2 fadeIn">{content}</div>}
      {children}
    </div>
  );
};

