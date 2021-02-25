import React from "react";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, user-scalable=0"/>
            </Head>
           <Component {...pageProps} />
        </React.Fragment>
    );
}