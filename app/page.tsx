import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UrbanRoots",
  description: "La plateforme dédiée au jardinage urbain collaboratif",
};

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center justify-start gap-4">
        <section className="relative w-full min-h-[44vw] p-mobile sm:p-desktop bg-[url(/medias/img/hero-landing.png)] bg-cover bg-center border-b-2 border-darkGreen">
          <div className="absolute top-[18vw] left-[10vw]">
            <h1 className="text-[8.5vw] leading-1">UrbanRoots</h1>
            <p className="font-bold text-darkGreen text-[2vw] leading-1">La plateforme dédiée au jardinage urbain collectif</p>
          </div>
        </section>
        <section className="relative w-full p-mobile sm:p-desktop flex justify-start gap-3 sm:justify-between flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <h2>La carte intéractive</h2>
            <p className="text-lg font-medium">
              UrbanRoots met à votre disposition une carte permettant de visualiser les anplacement des différets jardins urbains collaboratifs en France métropolitaine et
              Outre-mer.
            </p>
            <a
              href="/carte"
              className="block w-fit px-6 py-2 my-2 bg-lightGreen rounded font-bold transition-all duration-300 hover:bg-darkGreen hover:text-secondary"
              title="Visiter la carte">
              Visiter la carte
            </a>
            <p>{`Si vous avez connaissance d'un jardin non répertoriez, faisez nous en savoir !`}</p>
          </div>
          <div className="overflow-hidden w-3/4 mx-auto sm:w-1/2 md:w-1/3 h-fit rounded-2xl border-2 border-lightGreen">
            <a href="/carte" className="relative" title="Visiter la carte">
              <img src="/medias/img/map-screen.png" alt="Capture d'écran de la carte intéractive" className="w-full transition-all duration-300" />
              <div className="absolute top-0 left-0 w-full h-full bg-lightGreen bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 cursor-pointer"></div>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
