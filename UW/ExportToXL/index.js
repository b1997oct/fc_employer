import moment from 'moment'
import { utils, writeFile } from 'xlsx'

export default function ExportToXL(arr, name) {
    if (!arr.length) {
        alert('no export data found')
        return
    }
    const ws = utils.json_to_sheet(arr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${name}-${moment().format('DD-MM-YY')}.xlsx`)
}