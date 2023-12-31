import Head from "next/head";
import Header from "./Header";
import { useTheme } from "./Theme";

export default function Layout({ children, title = 'First Career' }) {
    return (
        <div>
            <Head>
                <title>First Career - Job Hub</title>
            </Head>
            <Header title={title} />
            <div style={{ background: '#66f1' }} className={'p-2'}>
                {children}
            </div>
        </div>
    )
}
