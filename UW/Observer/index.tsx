import React, { useEffect, useRef, useState } from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onIntersect: (val: boolean) => void
}

export default function Observer({ onIntersect, ...props }: Props) {
    const ref = useRef()
    const [yes, setYes] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            setYes(entries[0].isIntersecting)
        })
        observer.observe(ref.current)

        return () => observer.disconnect();

    }, [])

    useEffect(() => {
        onIntersect(yes)
    }, [yes])

    return <div ref={ref} {...props} />
}