import { AppProps as NextAppProps } from "next/app";
import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

import "../styles/global.scss";

function MyApp({
  Component,
  pageProps,
  err,
}: AppProps & { err: any }): JSX.Element {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return (
    <NextAuthProvider session={pageProps.session}>
      <>
        <Header />
        <Component {...pageProps} err={err} />
      </>
    </NextAuthProvider>
  );
}

export default MyApp;
