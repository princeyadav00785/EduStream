import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

