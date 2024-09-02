"use client";
import Header from "@/components/header";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

interface Guide {
  title: string;
  img: string;
  desc: string;
}

export default function Guides() {
  const [guides, setGuides] = useState<Guide[]>([]);

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  }

  useEffect(() => {
    const fetchGuides = async () => {
      const response = await fetch("/api/guides");
      const data = await response.json();
      setGuides(data);
    };
    fetchGuides();
  }, []);

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl">Tous les Guides</h1>
          <p className="font-satochi">Retrouvez ici tous nos guides de jardinage urbain afin de vous cultiver.</p>
          <ul className="flex flex-wrap justify-center gap-8 bg-lightGreen px-4 py-6 rounded-xl w-full">
            {Array.isArray(guides) && guides.length > 0 ? (
              guides.map((guide) => (
                <li key={guide.title} className="flex flex-col gap-2 w-96 p-4 bg-secondary rounded-xl">
                  <img src={guide.img} alt="image guide" className="w-full rounded-xl" />
                  <h2 className="text-xl text-darkGreen">{guide.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: truncateString(guide.desc, 100) }}></p>
                </li>
              ))
            ) : (
              <p className="text-red-500 font-bold"> ❌ Aucun guide trouvé.</p>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}
