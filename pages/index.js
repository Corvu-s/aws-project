import { useRouter } from "next/router";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Home({ signOut, user }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/aws.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hello {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to the Springfield Car Share Initiative App! This is the
            work of Luke Linigari for his summer 2022 AWS internship
          </Typography>
          <div className="flex space-x-2">
            <button className="submitButton" onClick={signOut}>
              Sign out
            </button>
            <button
              className="submitButton"
              onClick={() => router.push("/Booking")}
            >
              Enter
            </button>
          </div>
        </CardContent>
      </Card>
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
