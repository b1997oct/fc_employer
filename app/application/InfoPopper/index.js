import ServerFunction from '@/server';
import { createPopper } from '@popperjs/core';
import { useEffect, useRef } from 'react'

export default function InfoPopper({ data }) {

    let popper = useRef(null),
        onHov = async id => {
            if (!id) {
                popper.current.innerHTML = ''
            } else {
                popper.current.innerHTML = 'Loading...'
            }
            const container = document.querySelector(`a[info="${id}"]`)
            if (!container) return

            let fn = container.getAttribute('fn'),
                getData = ServerFunction(fn, {}),
                info = await getData(id)
            createPopper(container, popper.current, { placement: 'auto' });
            popper.current.innerHTML = JSON.stringify(info)
        }

    useEffect(() => {

        function setId(id) {
            const element = document.querySelector(`a[info="${id}"]`);
            if (element) {
                element.addEventListener('mouseenter', () => onHov(id));
                element.addEventListener('mouseleave', () => onHov());
            }
        }
        data.forEach(dat => {
            setId(dat.job._id)
            setId(dat.user._id)
        });

        return () => {
            data.forEach(dat => {
                setId(dat.job._id)
                setId(dat.user._id)
            });
        };
    }, [data]);


    return <div ref={popper} className="border bg max-w-60 max-h-52 overflow-auto rounded shadow-lg text-sm p-2 fadeIn" />

}
