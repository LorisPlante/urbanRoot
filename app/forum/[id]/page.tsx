"use client";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import CommentForm from "@/components/commentForm";
import { Loader } from "@/components/icons/loader";
import Header from "@/components/header";
import Footer from "@/components/footer";

type PostType = {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  createdAt: string;
};

type CommentType = {
  _id: string;
  content: string;
  author: { username: string };
  createdAt: string;
};

async function fetchPostAndComments(id: string) {
  const postResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
  if (!postResponse.ok) return { post: null, comments: [] };

  const post = await postResponse.json();
  const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?post=${id}`);
  const comments = await commentsResponse.json();

  return { post, comments };
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetchPostAndComments(params.id).then(({ post, comments }) => {
      if (!post) {
        notFound(); // Affiche la page 404 si le post n'existe pas
        return;
      }
      setPost(post);
      setComments(comments);
    });
  }, [params.id]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
          <section className="relative w-full p-mobile sm:p-desktop flex flex-col gap-4">
            <div className="flex justify-center items-center w-full py-10">
              <Loader size={44} color="fill-darkGreen" />
            </div>
          </section>
        </main>
        <Footer />
      </>
    ); // Affiche un message de chargement en attendant
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col gap-4">
          <a href="/forum">
            <svg viewBox="0 0 512 512" className="bg-secondary fill-darkGreen w-11 h-11 rounded-full hover:scale-110 transition-all duration-300">
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
          </a>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between gap-4">
            <div className="bg-lightGreen p-4 rounded-xl w-full md:w-2/3 flex flex-col gap-2">
              <h1 className="text-3xl">{post.title}</h1>
              <p>{post.content}</p>
              <p>
                De : <b>{post.author.username}</b> | Le : {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <ul className="bg-secondary rounded-xl p-4">
                {comments.map((comment: CommentType) => (
                  <li key={comment._id} className="py-2 flex justify-between gap-2 border-b border-gray-300">
                    <span>
                      <b> {comment.author.username}</b> : {comment.content}
                    </span>
                    <span className="text-gray-400 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 bg-white border-2 border-lightGreen rounded-xl p-4 w-full md:w-1/3 h-fit">
              <CommentForm postId={post._id} refreshComments={() => fetchPostAndComments(params.id).then(({ comments }) => setComments(comments))} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
