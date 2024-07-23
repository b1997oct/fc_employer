
export default function onDeleteStatus(setFn) {
    return (res) => {
        setFn(prev => {
            prev = prev.map(d => {
                if (d._id === res.data._id) {
                    d.deleted = true
                }
                return d
            })
            return prev
        })
    }
}
