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
import { Public_Sans } from 'next/font/google'

const font = Public_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <div className={font.className}>
        <Component {...pageProps} />
      </div>
      <div id='toast' className='toastOut' />
    </Theme>
  )
}
