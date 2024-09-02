//guides/pages.tsx
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Loader } from "@/components/icons/loader";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Guide {
  _id: string;
  title: string;
  img: string;
  desc: string;
}

export default function Guides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // État pour le chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  }

  useEffect(() => {
    const fetchGuides = async () => {
      setIsLoading(true); // Début du chargement
      setError(null); // Réinitialiser l'erreur
      try {
        const response = await fetch("/api/guides");
        if (!response.ok) {
          throw new Error("Failed to fetch guides");
        }
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        setError("Une erreur est survenue lors de la récupération des guides.");
        console.error("Error fetching guides:", error);
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };
    fetchGuides();
  }, []);

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl">Tous les Guides</h1>
          <p className="font-satochi">Retrouvez ici tous nos guides de jardinage urbain afin de vous cultiver.</p>

          {isLoading ? (
            <div className="flex justify-center items-center w-full py-10">
              <Loader size={44} color="fill-darkGreen"></Loader>
            </div>
          ) : error ? (
            <p className="text-red-500 font-bold p-4 bg-secondary rounded-xl">{error}</p>
          ) : (
            <ul className="flex flex-wrap justify-center gap-8 bg-lightGreen px-4 py-6 rounded-xl w-full">
              {Array.isArray(guides) && guides.length > 0 ? (
                guides.map((guide) => (
                  <li key={guide._id} className="flex flex-col gap-2 w-96 p-4 bg-secondary rounded-xl">
                    <Link href={`/guides/${guide._id}`}>
                      <img src={guide.img} alt={guide.title} className="w-full rounded-xl" />
                      <h2 className="text-xl text-darkGreen">{guide.title}</h2>
                      <p dangerouslySetInnerHTML={{ __html: truncateString(guide.desc, 100) }}></p>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-red-500 font-bold p-4 bg-secondary rounded-xl">❌ Aucun guide pour le moment</p>
              )}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
