const { createContext, useContext, useState, useEffect } = require("react");

const Ctx = createContext()

export const useTheme = () => useContext(Ctx)

export default function Theme({ children }) {
    const [width, setWidth] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 768);
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <Ctx.Provider value={{ width }}>
            {children}
        </Ctx.Provider>
    )
}