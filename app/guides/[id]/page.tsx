// app/guides/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Guide {
  _id: string;
  title: string;
  img: string;
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
    notFound(); // Returns a 404 response if the guide is not found
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <div className="w-full sm:w-2/3 lg:w-7/12 flex flex-col gap-4 p-4 mx-auto bg-secondary rounded-xl">
            <img src={guide.img} alt={guide.title} className="w-full rounded-xl" />
            <h1 className="text-3xl text-darkGreen">{guide.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: guide.desc }}></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
