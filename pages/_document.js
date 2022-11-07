import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta name="description" content="Pokemon catcher application" />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemprop="name" content="Poké Room" />
          <meta
            itemprop="description"
            content="Pokemon catcher fan made application"
          />
          <meta
            itemprop="image"
            content="https://github.com/lutfianwr/poke-catcher/blob/main/public/screenshot.png"
          />

          {/* <!-- Facebook Meta Tags --/> */}
          <meta property="og:url" content="https://poke-room.netlify.app" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Poké Room" />
          <meta
            property="og:description"
            content="Pokemon catcher fan made application"
          />
          <meta property="og:image" content="" />

          {/* <!-- Twitter Meta Tags --/> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Poké Room" />
          <meta
            name="twitter:description"
            content="Pokemon catcher fan made application"
          />
          <meta
            name="twitter:image"
            content="https://github.com/lutfianwr/poke-catcher/blob/main/public/screenshot.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
