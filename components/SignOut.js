import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
async function signOutAction(router) {
  try {
    await Auth.signOut();
    router.push("/");
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
export default function SignOut() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => signOutAction(router)} className="submitButton">
        Sign Out
      </button>
    </div>
  );
}
