import moment from 'moment'
import { utils, writeFile } from 'xlsx'

export default function ExportToXl(arr) {
    if (!arr.length) {
        alert('no export data found')
        return
    }
    const ws = utils.json_to_sheet(arr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `fc-${moment().format('DD-MM-YY')}.xlsx`)

}
