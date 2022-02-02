import type { AppProps } from "next/app";

import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  // We don't need to server-side render the app
  if (typeof window === "undefined") {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
