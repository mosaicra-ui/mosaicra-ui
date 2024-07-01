import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          <link rel="icon" href="/packages/favicon/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/packages/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/packages/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/packages/favicon/favicon-16x16.png" />
          <link rel="icon" type="image/svg" sizes="192x192" href="/packages/favicon/android-chrome-192x192.png"  />
          <link rel="icon" type="image/svg" sizes="512x512" href="/packages/favicon/android-chrome-512x512.png"  />
          <link rel="manifest" href="/packages/favicon/site.webmanifest" />
        </Head>
        <body className="dark:bg-dark">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
