export function getCookie(name) {
    for (let d of document.cookie.split(';')) {
        let [key, value] = d.split('=')
        if (name == key.trim()) {
            return value
        }
    }

}

export function setCookie({ name, value, maxAge }) {
    document.cookie = `${name}=${value};path=/;${maxAge ? 'max-age=' + maxAge : ''}`
}