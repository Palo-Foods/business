import React from "react";
import Script from "next/script";
import Head from "next/head";
import Header from "../Header";

function DashboardLayout(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Palo"}</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A vendor management app" />
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
      <Header />
      <div className="container-lg my-5 py-4">
        <div className="row py-2">
          <div className="col-12">{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
