import type { AppProps } from "next/app";

import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
