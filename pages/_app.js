import "../styles/styles.scss";
import { Provider } from "react-redux";
import { store } from "../store";
import ErrorBoundary from "../components/ErrorBoundary";


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
