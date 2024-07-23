
export default function onUpdate(setFn, res, id) {
    if (res) {
        setFn(data => {
            if (id == 'new') {
                data = [...data, res]
            } else {
                data = data.map(d => {
                    if (d._id == res._id) {
                        d = { ...d, ...res }
                    }
                    return d
                })
            }
            return data
        })
    }
}
