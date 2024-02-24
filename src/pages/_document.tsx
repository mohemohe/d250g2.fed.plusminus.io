import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <title>d250g2.fed.plusminus.io</title>
      </Head>
      <body>
        <main className="container">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  )
}