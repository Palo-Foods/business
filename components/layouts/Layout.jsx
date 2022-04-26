import React from "react";
import Script from "next/script";
import Head from "next/head";

function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Palo Foods"}</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A management app for palo foods" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Script src="/bootstrap.bundle.min.js" />
      {/*  <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`}
        type="text/javascript"
      /> */}
      <div className="container-fluid">{props.children}</div>
    </>
  );
}

export default Layout;
