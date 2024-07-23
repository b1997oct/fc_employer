
export default function onArrDelete(setFn) {
    return res => {
        setFn(prev => {
            prev = prev.filter(d => d._id !== res.data._id)
            return prev
        })
    }
}
