import { Public_Sans } from "next/font/google";
import './styles/table.css'
import "./styles/globals.css";
import './styles/tailwind.css'
import './styles/components.css'
import './styles/animation.css'
import './styles/project.css'
import ConfigProvider from "./config";
import Script from "next/script";
import dbConnect from "@/lib/db";
import Team from "@/schema/Team";
import { getUser } from "./server";

const font = Public_Sans({ subsets: ['latin'] })

export const metadata = {
  title: "Next js",
  description: "React app"
};

const perms = async () => {
  try {
    await dbConnect()
    let { user, role } = getUser()
    let config = await Team.findById(user)
    config = JSON.parse(JSON.stringify(config))
    config.isTeam = role == 'team'
    config.isRecruiter = role == 'recruiter'
    config.isUser = !role
    config.role = role
    return config
  } catch (error) {
    return null
  }
}

export default async function RootLayout({ children }) {

  let config = await perms()

  return (
    <html lang="en">
      <body className={font.className}>
        <ConfigProvider value={config}>
          {children}
        </ConfigProvider>
        <Script id="config" data={JSON.stringify(config || {})}></Script>
        <div id="modal" />
        <div id="toast" className="toastOut " />
      </body>
    </html>
  );
}
