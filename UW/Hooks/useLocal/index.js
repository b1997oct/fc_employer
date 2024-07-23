import { useEffect } from "react"

export default function useLocal(name,setFun) {
    useEffect(() => {
        try {
            let data = localStorage.getItem(name)
            setFun(data)
        } catch (error) {
            console.log('local db error');
        }

    }, [])
}
