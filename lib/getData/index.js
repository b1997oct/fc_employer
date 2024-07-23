import { POST } from "@upgradableweb/client"

export default async function getData(url, body) {
  try {
    let res = await POST(url, body, { headers: { origin: 'https://mks-vert.vercel.app', next: { revalidate: 5 } } })
    return res
  } catch ({ message }) {
    return { message }
  }
}