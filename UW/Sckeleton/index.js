
export default function Sckeleton({ length=1, children }) {
    return Array.from({ length }).map(d => children)
}
