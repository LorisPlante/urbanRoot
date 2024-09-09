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
      <main className="flex min-h-screen flex-col items-center justify-start gap-4 mt-24 sm:mt-0">
        <section className="relative w-full min-h-[44vw] p-mobile sm:p-desktop bg-[url(/medias/img/hero-landing.png)] bg-cover bg-center border-b-2 border-darkGreen">
          <div className="absolute top-[18vw] left-[10vw]">
            <h1 className="text-[8.5vw] leading-1">UrbanRoots</h1>
            <p className="font-bold text-darkGreen text-[2vw] leading-1">La plateforme dédiée au jardinage urbain collectif</p>
          </div>
        </section>
        <section className="w-full p-mobile sm:p-desktop bg-secondary flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-[45%] flex flex-col gap-5 border-2 border-lightGreen rounded-xl px-10 py-8">
            <h2 className="text-3xl sm:text-4xl">{`Bienvenue sur UrbanRoots`}</h2>
            <p>
              {`Bienvenue sur UrbanRoots, votre nouvelle plateforme dédiée au jardinage urbain collaboratif. UrbanRoots est né de l'ambition de créer une communauté verte et
              solidaire au cœur de nos villes. Nous croyons que chaque espace urbain, aussi petit soit-il, peut se transformer en un havre de verdure et de biodiversité,
              contribuant ainsi à améliorer notre cadre de vie et à renforcer nos liens sociaux.`}
            </p>
          </div>
          <div className="bg-lightGreen bg-opacity-40 w-1/2 lg:w-[10%] h-10 lg:h-32"></div>
          <div className="w-full lg:w-[45%] flex flex-col gap-5 border-2 border-lightGreen rounded-xl px-10 py-8">
            <h2 className="text-3xl sm:text-4xl">{`Qu'est-ce que UrbanRoots?`}</h2>
            <p>
              {`UrbanRoots vous offre une carte interactive pour localiser et créer des espaces de jardinage près de chez vous. Que vous soyez un jardinier débutant ou expérimenté,
              notre plateforme vous permet de partager vos ressources et conseils avec d'autres passionnés, d'organiser des événements communautaires, et de participer à des forums
              de discussions pour échanger vos idées et astuces.`}
            </p>
          </div>
        </section>
        <section className="relative w-full p-mobile sm:p-desktop flex justify-start gap-3 sm:justify-between flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl">La carte intéractive</h2>
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
            <p>
              {`Si vous avez connaissance d'un jardin non répertoriez, faites-le nous savoir`}{" "}
              <a href="/contact" className="underline text-darkGreen font-bold">
                ici
              </a>
              {` !`}
            </p>
          </div>
          <div className="overflow-hidden w-3/4 sm:w-1/2 md:w-1/3 mx-auto sm:mx-0 h-fit rounded-2xl border-2 border-lightGreen">
            <a href="/carte" className="relative" title="Visiter la carte">
              <img src="/medias/img/map-screen.png" alt="Capture d'écran de la carte intéractive" className="w-full transition-all duration-300" />
              <div className="absolute top-0 left-0 w-full h-full bg-lightGreen bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 cursor-pointer"></div>
            </a>
          </div>
        </section>
        <section className="relative w-full p-mobile sm:p-desktop flex justify-start gap-3 sm:justify-between flex-col-reverse sm:flex-row">
          <div className="overflow-hidden w-3/4 sm:w-1/2 md:w-5/12 mx-auto sm:mx-0 ">
            <a href="/forum" className="relative" title="Aller sur le forum">
              <svg viewBox="0 0 640 512" className="fill-lightGreen hover:fill-darkGreen transition-all duration-300 w-1/2 mx-auto">
                <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
              </svg>
            </a>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl">Le forum de la communauté</h2>
            <p className="text-lg font-medium">
              UrbanRoots et sa communauté peuvent communiquer et partager des informations concernant le jardinage urbains afin de s'entraider pour le bien des potager.
            </p>
            <a
              href="/forum"
              className="block w-fit px-6 py-2 my-2 bg-lightGreen rounded font-bold transition-all duration-300 hover:bg-darkGreen hover:text-secondary"
              title="Consulter les guides">
              Aller sur le forum
            </a>
            <p>{`Exprimez vos besoins et aidez la communauté !`}</p>
          </div>
        </section>
        <section className="relative w-full p-mobile sm:p-desktop flex justify-start gap-3 sm:justify-between flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl">Les guides pour cultiver</h2>
            <p className="text-lg font-medium">UrbanRoots met à votre disposition différents guides pour cultiver divers légumes dans vos jardins urbains.</p>
            <a
              href="/guides"
              className="block w-fit px-6 py-2 my-2 bg-lightGreen rounded font-bold transition-all duration-300 hover:bg-darkGreen hover:text-secondary"
              title="Consulter les guides">
              Consulter les guides
            </a>
            <p>{`Venez vous cultiver pour mieux cultiver !`}</p>
          </div>
          <div className="overflow-hidden w-3/4 sm:w-1/2 md:w-5/12 mx-auto sm:mx-0 h-fit rounded-2xl border-2 border-lightGreen">
            <a href="/guides" className="relative" title="Consulter les guides">
              <img src="/medias/img/guides/guide1.jpg" alt="Capture d'écran de la carte intéractive" className="w-full transition-all duration-300" />
              <div className="absolute top-0 left-0 w-full h-full bg-lightGreen bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 cursor-pointer"></div>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
