import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
