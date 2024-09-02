import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Forum() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl">Forum</h1>
        </section>
      </main>
      <Footer />
    </>
  );
}
