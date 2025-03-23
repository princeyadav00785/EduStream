import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

import AuthGuard from "@/components/auth/AuthGuard";
import Head from "next/head";

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <Provider store={store}>
      <AuthGuard>
        <Head>
          <title>Edustream</title>
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthGuard>
    </Provider>
  );
}
