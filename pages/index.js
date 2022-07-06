import { useRouter } from "next/router";
import Booking from "./Booking";
export default function Home() {
  const router = useRouter();

  return (
    <div>
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
