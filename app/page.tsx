import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 bg-darkGreen">
        <p className="font-bold text-9xl text-white font-tanker tracking-widest">Urban Roots</p>
        <p className="font-bold text-6xl text-lightGreen">Too late</p>
      </main>
    </>
  );
}
