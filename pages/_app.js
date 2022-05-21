import "../styles/styles.scss";
import { Provider } from "react-redux";
import { store } from "../store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ErrorBoundary from "../components/ErrorBoundary";

library.add(fas, faTwitter, faFontAwesome);

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
