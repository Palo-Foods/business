import React from "react";
import Script from "next/script";
import Head from "next/head";
import Aside from "../Aside";
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
      <Script src="https://use.fontawesome.com/2a1054e16f.js" />
      <Script src="/bootstrap.bundle.min.js" />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1 col-md-3 col-xl-2 py-3 d-none d-sm-block vh-100 bg-white px-0 position-sticky sticky-sidebar">
            <Aside />

            <div className="w-100 position-absolute" style={{ bottom: 0 }}>
              <div className="border-top w-100 d-flex justify-content-center align-items-top p-1 px-lg-3 py-1">
                <img
                  src="/images/profile.jpg"
                  width={30}
                  height={30}
                  className="rounded-circle img-fluid m-1"
                  style={{ objectFit: "scale-down" }}
                />
                <div className="ms-3 d-none d-md-block">
                  <p className="mb-0 mt-2 fw-bold">Alex Mensah</p>
                  <p className="text-muted">Fullstack engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-11 col-md-9 col-xl-10">
            <div className="container-fluid p-2 p-md-4 my-5 py-4">
              <div className="row">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
