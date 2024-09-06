"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Contact() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4 overflow-hidden">
          <div className="hidden lg:block absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border- border-[100px] border-darkGreen transform -translate-x-1/2 translate-y-1/2 "></div>
          <div className="hidden lg:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full border- border-[100px] border-darkGreen transform translate-x-1/2 translate-y-1/2 "></div>
          <h1 className="text-3xl">Vous désirez nous contacter ?</h1>
          <p>Un jardin urbain à nous indiquer, une problème concernant la plateforme UrbanRoots, ou une question à poser ?</p>
          <p>{`N'hésitez pas à nous contacter à l'adresse mail ci-dessous !`}</p>
          <a
            href="mailto:contact@urbanroots.fr"
            className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block w-fit px-4 py-2 rounded">
            {`contact@urbanroots.fr`}
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
