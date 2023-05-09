import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyle } from '../components/styles/GlobalStyle';

function app({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
   
app.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  
  return { ...appProps }
}

export default app;