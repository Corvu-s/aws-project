export default function Home() {
  return (
    <div>
      <p>Lukes Thing with auto push! and much more!</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("Server Side Rendering");
  return {
    props: { test: "data" },
  };
}
