import TableSkeleton from "./TableSkeleton";

export default function Table({ col, loading, children, className = '' }) {
    return (
        <div className={"overflow-auto bg max-h-screen " + className}>
            <table>
                <tbody>
                    {children}
                    {loading && <TableSkeleton col={col} /> || null}
                </tbody>
            </table>
        </div>
    )
}
