import React, { useEffect, useRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    value?: any
    onClickAway?: (value?: any) => void;
}

export default function ClickAwayListener({ value, onClickAway, ...props }: Props) {

    const ref = useRef(null);
    useEffect(() => {
        const handle = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClickAway(value);
            }
        };

        document.addEventListener('mousedown', handle);

        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, [onClickAway]);

    return <div ref={ref}  {...props} />
};
