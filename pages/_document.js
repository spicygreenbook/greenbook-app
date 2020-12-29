// @generated: @expo/next-adapter@2.1.0
//export { default } from '@expo/next-adapter/document';

import { getInitialProps } from '@expo/next-adapter/document';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#eaeaea" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, user-scalable=0"/>
            <link rel="manifest" href="site.webmanifest" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="spicygreenbook.org" />
        </Head>
        <body>
          <Main />
          <NextScript />
            <link href="/site.css" rel="stylesheet" />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-168538359-1`}/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-168538359-1');
            `}} />
            <script
            dangerouslySetInnerHTML={{
              __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 12115266;
              (function() {
                var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
                lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
              })();
           `}} />
        </body>
      </html>
    )
  }
};

CustomDocument.getInitialProps = async props => {
  const result = await getInitialProps(props);
  // Mutate result...
  return result;
};

export default CustomDocument;
