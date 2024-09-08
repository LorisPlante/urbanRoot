"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
  const [user, setUser] = useState<{ _id?: string }>({});

  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();

    // Check localStorage for user data
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userFromLocalStorage);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user._id) {
      console.error("User not logged in");
      return;
    }

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author: user._id }),
    });

    // Refresh posts
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);

    setTitle("");
    setContent("");
  };

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <h1 className="text-3xl">Forum</h1>
          <div className="w-full flex justify-between gap-4">
            <ul className="flex flex-col gap-4 bg-lightGreen rounded-xl p-4 w-2/3">
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
            <div className="w-1/3 flex flex-col gap-2">
              <h2 className="text-3xl">Créer un nouveau post</h2>
              {user._id ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-secondary border-2 border-lightGreen rounded-xl p-4 w-full h-fit">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="py-2 px-4 rounded" />
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="py-2 px-4 rounded" />
                  <button
                    type="submit"
                    className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
                    Créer un post
                  </button>
                </form>
              ) : (
                <a
                  href="/connexion"
                  className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded text-center">
                  Se connecter pour créer un post
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ForumPage;
