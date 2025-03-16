import ReduxProvider from "@/redux/Provider";
import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
    <ReduxProvider>
    <Component {...pageProps} />
    <ToastContainer />
    </ReduxProvider>
    </>
  );
}

