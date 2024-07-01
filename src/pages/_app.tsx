import "@/styles/globals.css";
// import '@/styles/code/prism-cb.css'
// import '@/styles/code/prism-atom-dark.css'
// import '@/styles/code/prism-vsc-dark.css'
import '@/styles/code/prism-a11y-dark.css'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/router';
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import MosaicraUiNavbar from '@/components/Navbar/MosaicraUiNavbar'
import Footer from "@/components/Footer/Footer";
import SaveScroll from '@/components/Hooks/SaveScroll';
import RestoreScroll from '@/components/Hooks/RestoreScroll';
import MosaicraUiLayout from '@/components/Mosaicra/MosaicraUiLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { events } = router;
  const [isLoading, setIsLoading] = useState(false);
  const isMosaicraUIPage = router.pathname.startsWith('/mosaicra-ui');

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleComplete = () => {
      setIsLoading(false);
    };
    

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleComplete);
      events.off('routeChangeError', handleComplete);
    };
  }, [events]);

  return (
    <>
      <SaveScroll />
      <RestoreScroll />
      {/* {router.pathname === '/mosaicra-ui' ? <MosaicraUiNavbar /> : <Navbar />} */}
      {/* {isMosaicraUIPage ? (<MosaicraUiNavbar />) : (<Navbar />)} */}
      <MosaicraUiNavbar />
      <div className="container px-20 mx-auto lg:px-6 xl:px-20 md:px-6 sm:px-4 pt-4  pb-2">
        {/* {isMosaicraUIPage ? ( */}
          <MosaicraUiLayout>
            <Component {...pageProps} />
          </MosaicraUiLayout>
        {/* ) : (<Component {...pageProps} />)} */}
        {/* <Component {...pageProps} /> */}
      </div>
      {isLoading && <div className="fixed bottom-0 left-0 w-full h-1 z-10 gradient-loader show" />}
      <Footer />
    </>
  );
}
