import React from "react";
import Script from "next/script";
import Head from "next/head";

function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Simple Hr"}</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A people managing app" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      {/*  <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`}
        type="text/javascript"
      /> */}
      <Script src="https://use.fontawesome.com/2a1054e16f.js" />
      <Script src="/bootstrap.bundle.min.js" />
      <div className="container-fluid">{props.children}</div>
    </>
  );
}

export default Layout;
