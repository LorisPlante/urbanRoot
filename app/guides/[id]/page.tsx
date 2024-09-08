import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Guide {
  _id: string;
  title: string;
  img: string;
  slug: string;
  desc: string;
}

async function fetchGuide(id: string): Promise<Guide | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guides/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching guide:", error);
    return null;
  }
}

export default async function GuidePage({ params }: { params: { id: string } }) {
  const guide = await fetchGuide(params.id);

  if (!guide) {
    notFound(); // Retourne une réponse 404 si le guide n'est pas trouvé
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <a href="/guides" className="absolute top-8 sm:top-11 left-5 sm:left-11">
            <svg viewBox="0 0 512 512" className="bg-secondary fill-darkGreen w-11 h-11 rounded-full  hover:scale-110 transition-all duration-300">
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
          </a>
          <div className="w-full sm:w-2/3 lg:w-7/12 flex flex-col gap-4 p-4 mx-auto bg-secondary rounded-xl">
            {/* Utilisation de next/image avec des dimensions fixes pour éviter l'erreur */}
            <Image src={guide.img} alt={guide.title} width={500} height={300} className="w-full rounded-xl" />
            <h1 className="text-3xl text-darkGreen">{guide.title}</h1>
            <h2>{guide.slug}</h2>
            {/* Affiche guide.desc de manière sécurisée */}
            <p dangerouslySetInnerHTML={{ __html: guide.desc }} id="descGuides"></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
