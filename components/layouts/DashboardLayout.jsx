import React from "react";
import Script from "next/script";
import Head from "next/head";
import Header from "../Header";
import AsideContent from "../AsideContent";

function DashboardLayout(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Palo"}</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A businesses management app" />
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

      <div className="container-fluid">
        <div className="row h-100">
          <div className="d-none d-lg-block col-lg-2 bg-white border-end py-3 vh-100">
            <AsideContent />
          </div>
          <div className="col-lg-10 mb-5 px-0">
            <Header />
            <div className="p-3">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
