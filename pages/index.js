import { useRouter } from "next/router";
import Booking from "./Booking";

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
function Home({ signOut, user }) {
  const router = useRouter();

  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <button className="submitButton" onClick={() => router.push("/Booking")}>
        Enter
      </button>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   console.log("Server Side Rendering");
//   return {
//     props: { test: "data" },
//   };
// }
export default withAuthenticator(Home);
