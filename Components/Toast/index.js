let t = null
export default function Toast(message) {
    clearTimeout(t)
    const toast = document.getElementById('toast')
    toast.innerHTML = message
    toast.classList.replace('toastOut','toastIn')
    t = setTimeout(() => toast.classList.replace('toastIn', 'toastOut'), 3000)
}