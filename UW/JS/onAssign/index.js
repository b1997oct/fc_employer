
export default function onAssign(obj) {
    return prev => ({ ...prev, ...obj })
}
