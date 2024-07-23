
export default function Tggr(fn, ...value) {
    return () => fn && fn(...value)
}
