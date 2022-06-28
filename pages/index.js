export default function Home() {
  return (
    <div>
      <p>Lukes Thing with auto push!</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
