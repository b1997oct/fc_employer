
export default function Adaptor(data) {

    function View(Wrapper) {
        return Array.isArray(data) && data.map(d => <Wrapper {...d} />)
    }
    return View
}
