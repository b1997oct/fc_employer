export default function Toggle(setFun) {
    return () => setFun(prev => !Boolean(prev))
}
