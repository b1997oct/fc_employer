import React, { useEffect, useRef } from 'react';

export default function ClickAwayListener({ children, className, onClickAway }) {

    const containerRef = useRef(null);
    useEffect(() => {
        const handle = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClickAway();
            }
        };

        document.addEventListener('mousedown', handle);

        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, [onClickAway]);

    return <div ref={containerRef} className={className}>{children}</div>;
};
