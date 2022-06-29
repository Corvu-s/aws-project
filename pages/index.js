export default function Home() {
  return (
    <div>
      <p>Lukes Thing, now with coolness</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
