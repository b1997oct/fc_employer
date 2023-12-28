import '@/styles/globals.css'
import '@/styles/flex.css'
import '@/styles/table.css'
import '@/styles/typography-border-shadow.css'
import '@/styles/mar-pad-pos.css'
import '@/styles/components.css'
import '@/styles/button.css'
import '@/styles/amination.css'
import Theme from '@/Layout/Theme'

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  )
}
