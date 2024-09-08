"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Loader } from "@/components/icons/loader";
import { useState, useEffect } from "react";

type Post = {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  createdAt: string;
};

const ForumPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author: user._id }),
    });

    // Réactualiser la liste des posts après la création d'un nouveau post
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);

    setTitle("");
    setContent("");
  };

  if (!posts) {
    return (
      <>
        <Header></Header>
        <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
          <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4 ">
            <div className="flex justify-center items-center w-full py-10">
              <Loader size={44} color="fill-darkGreen"></Loader>
            </div>
          </section>
        </main>
      </>
    ); // Affiche un message de chargement en attendant
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <h1 className="text-3xl">Forum</h1>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between gap-4">
            <ul className="flex flex-col gap-4 bg-lightGreen rounded-xl p-4 w-full md:w-2/3">
              {posts.map((post) => (
                <li key={post._id}>
                  <a href={`/forum/${post._id}`} className="flex gap-2 bg-secondary w-full p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[101%]">
                    <div className="flex flex-col gap-1">
                      <span className="font-black">{post.author.username}</span>
                      <span className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="w-[2px] h-14 bg-lightGreen"></div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{post.title}</span>
                      <span>{post.content}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white border-2 border-lightGreen rounded-xl p-4 w-full md:w-1/3 h-fit">
              <h2 className="text-3xl">Créer un nouveau post</h2>
              <label htmlFor="titrePost">Titre :</label>
              <input id="titrePost" value={title} onChange={(e) => setTitle(e.target.value)} className="py-2 px-4 rounded border-2 border-lightGreen w-full" />
              <label htmlFor="subjectPost">Sujet :</label>
              <textarea id="subjectPost" value={content} onChange={(e) => setContent(e.target.value)} className="py-2 px-4 rounded border-2 border-lightGreen w-full" />
              {user._id ? (
                <button type="submit" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
                  Créer un post
                </button>
              ) : (
                <a
                  href="/connexion"
                  className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded text-center">
                  Se connecter pour créer un post
                </a>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ForumPage;
