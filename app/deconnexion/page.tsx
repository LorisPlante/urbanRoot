"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Connexion() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-wrap justify-center items-center flex-col  gap-4">
          <h1 className="text-3xl">Vous êtes déconnecté</h1>

          <a href="/" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
            {`Retourner à l'accueil`}
          </a>
          <a href="/connexion" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
            Se reconnecter
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
