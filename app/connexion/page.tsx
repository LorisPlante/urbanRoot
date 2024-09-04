"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import SignUp from "@/components/signUp";

export default function Connexion() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-wrap justify-center items-center flex-col lg:flex-row gap-4">
          <Login></Login>
          <SignUp></SignUp>
        </section>
      </main>
      <Footer />
    </>
  );
}
