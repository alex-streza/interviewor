import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <Head>
          <link
            rel="preload"
            href="/assets/fonts/onest/Onest-Black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/onest/Onest-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
