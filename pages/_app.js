import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
