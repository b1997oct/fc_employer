import '@/styles/flex.css'
import '@/styles/table.css'
import '@/styles/typography-border-shadow.css'
import '@/styles/mar-pad-pos.css'
import '@/styles/components.css'
import '@/styles/button.css'
import '@/styles/amination.css'
import '@/styles/select.css'
import '@/styles/project.css'
import '@/styles/globals.css'
import Theme from '@/Layout/Theme'
import { IBM_Plex_Sans, Public_Sans } from 'next/font/google'

const font = IBM_Plex_Sans({ subsets: ['latin'], weight: ["100","200", "300", "400", "500", "600", "700"] })

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <div className={font.className}>
        <Component {...pageProps} />
      </div>
    </Theme>
  )
}
