
let dev = 'https://api.speedjobfinder.in' 
 dev = 'http://localhost:3001'

   let url = process.env.NODE_ENV == 'development' ? dev : 'https://api.sppedjobfinder.in'
export default function baseUrl(path) {
    return url + path
}
