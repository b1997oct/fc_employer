

export default function onEnter(fn) {
    const onKeyDown = e => e.code == 'Enter' && fn()
    return { onKeyDown }
}
