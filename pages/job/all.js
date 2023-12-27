import Layout from '@/Layout'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout>
            <div className='df m-2 jce'>
                <Link href='/job/new'>
                <button className='btn p-btn'>CREATE +</button>
                </Link>
            </div>
        </Layout>
    )
}
