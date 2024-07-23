import React, { useEffect } from 'react'

export default function Tooltiper() {

    useEffect(() => {

        let tooltips = document.querySelectorAll('tooltip=')
        data.forEach(dat => {
            onHover(dat.job._id)
        });

        return () => {
            data.forEach(dat => {
                onHover(dat.job._id)
            });
        };
    }, [data]);
}
