import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import * as fbq from '../src/services/fbpixel'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  // @ts-ignore
  return (
    <>
    {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <Script
        id="open-in-native-browser"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var userAgent = navigator.userAgent || navigator.vendor || window.opera;
          var str = navigator.userAgent;
          var instagram = str.indexOf("Instagram");
          var facebook = str.indexOf("FB");
  
          if (/android/i.test(userAgent) && (instagram != -1 || facebook != -1) ) {
              document.write("<a target=\"_blank\" href=\"https://www.parsec.studio\" download id=\"open-browser-url\">Opening in native browser...</a>");
              window.stop();
              let input = document.getElementById('open-browser-url');
              if (input) {
                  input.click();
              }
          }
          `,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
