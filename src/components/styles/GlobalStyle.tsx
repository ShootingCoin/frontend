import { Global } from "@emotion/react"

export const GlobalStyle = () => <Global
  styles={`
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Thin.woff') format('woff');
      font-weight: 250;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-ExtraLight.woff') format('woff');
      font-weight: 265;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Light.woff') format('woff');
      font-weight: 300;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Medium.woff') format('woff');
      font-weight: 400;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Regular.woff') format('woff');
      font-weight: 400;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Medium.woff') format('woff');
      font-weight: 500;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-SemiBold.woff') format('woff');
      font-weight: 600;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Bold.woff') format('woff');
      font-weight: 700;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-ExtraBold.woff') format('woff');
      font-weight: 800;
    }
    
    body {
      margin: 0;
      width: 100%;
      min-height: 100%;
      background-image: linear-gradient(168.36deg, #0E1159 -12.54%, #090727 9.05%, #07143E 15.49%, #06000C 96.78%) !important;
      font-family: 'Rota', sans-serif !important;
    }
  `}
/>;
