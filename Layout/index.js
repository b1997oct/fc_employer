import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {

    return (
        <div>
            <Head>
                <title>First Career - Job Hub</title>
            </Head>
            <Header />
            <div className="p-2">
                {children}
            </div>
        </div>
    )
}
