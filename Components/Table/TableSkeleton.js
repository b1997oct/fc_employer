import TRow from "./TRow";

export default function TableSkeleton({ row = 4, col }) {
    return (
        Array.from({ length: row }).map((_, i) => (
            <TRow key={i}>
                {Array.from({ length: col }).map((d, ind) => (
                    <td className='p' key={ind}>
                        <div className='skt rounded-sm' style={{ height: 8, margin: '24px 4px' }} />
                    </td>
                ))}
            </TRow>
        ))
    )
}
