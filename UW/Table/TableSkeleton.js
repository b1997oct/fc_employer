
export default function TableSkeleton({ row = 4, col }) {
    return (
        Array.from({ length: row }).map((_, i) => (
            <tr key={i} className="hover:shadow-lg">
                {Array.from({ length: col }).map((d, ind) => (
                    <td className='p' key={ind}>
                        <div className='skt rounded h-4 my' />
                    </td>
                ))}
            </tr>
        ))
    )
}
