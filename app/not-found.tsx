"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Custom404() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="relative w-full p-mobile sm:p-desktop flex justify-center items-center flex-col gap-4 overflow-hidden">
          <div className="hidden lg:block absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border- border-[100px] border-darkGreen transform -translate-x-1/2 translate-y-1/2 "></div>
          <div className="hidden lg:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full border- border-[100px] border-darkGreen transform translate-x-1/2 translate-y-1/2 "></div>
          <h1 className="text-4xl font-bold mb-4 animate-bounce">404 - Page non trouvée</h1>
          <p className="text-lg mb-8">{`Oups ! La page que vous cherchez n'existe pas ou a été déplacée.`}</p>
          <a href="/" className="block w-fit px-6 py-2 my-2 bg-lightGreen rounded font-bold transition-all duration-300 hover:bg-darkGreen hover:text-secondary">
            {`Retour à l'accueil`}
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
