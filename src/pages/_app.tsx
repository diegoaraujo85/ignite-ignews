import { AppProps as NextAppProps } from "next/app";
import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </NextAuthProvider>
  );
}

export default MyApp;
