import NoDataFound from "../NoDataFound";
import TableSkeleton from "./TableSkeleton";

export default function Table({ col, loading, nodata, children, className }) {
    return (
        <>
            <div style={{ paddingBottom: !nodata && '12%' }} className={`table ${className}`}>
                <table>
                    {children}
                    {loading &&
                        <tbody>
                            <TableSkeleton
                                col={col}
                            />
                        </tbody>}
                </table>
            </div>
            {nodata && <NoDataFound />}
        </>
    )
}
