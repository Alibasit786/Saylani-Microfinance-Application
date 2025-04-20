// pages/_app.js (or in individual pages)
import '../styles/globals.css';

import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
