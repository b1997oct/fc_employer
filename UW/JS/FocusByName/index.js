
export default function FocusByName(name) {
   document.getElementsByName(name).forEach(d=>d.focus())
}
