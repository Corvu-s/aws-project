import { useRouter } from "next/router";
import Booking from "./Booking";
export default function Home() {
  const router = useRouter();

  return <Booking />;
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
