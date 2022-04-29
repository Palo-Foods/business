import "../styles/styles.scss";
import { Provider } from "react-redux";
import { store } from "../store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useRouter } from "next/router";

library.add(fas, faTwitter, faFontAwesome);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  //match modal to route
  //if route is not add-business, go back to businesses
  useEffect(() => {
    if (!router.pathname?.includes("add")) {
      //go to businesses route
      router.back()
    }
    console.log(router);
  }, []);
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
