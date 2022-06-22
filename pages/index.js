export default function Home() {
  return (
    <div>
      <p>Lukes Thing</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
