export default function Home() {
  return (
    <div>
      <p>Lol this cicd thing is strange</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
