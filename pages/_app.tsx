import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}

export default MyApp
