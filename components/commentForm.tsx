// components/CommentForm.tsx
"use client";

import { useState } from "react";

type Props = {
  postId: string;
  refreshComments: () => void; // Fonction de rafraîchissement passée en props
};

export default function CommentForm({ postId, refreshComments }: Props) {
  const [commentContent, setCommentContent] = useState("");

  // Récupérer l'ID de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || userId.length !== 24) {
      console.error("Invalid user ID");
      return;
    }

    await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentContent, post: postId, author: userId }),
    });

    setCommentContent("");
    refreshComments(); // Appeler la fonction pour rafraîchir les commentaires
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
        <h2 className="text-3xl">Laisser un commentaire</h2>
        <label htmlFor="comment">Commentaire :</label>
        <input
          type="text"
          id="comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="py-2 px-4 rounded border-2 border-lightGreen w-full"
        />
        {userId ? (
          <button type="submit" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
            Ajouter un commentaire
          </button>
        ) : (
          <a
            href="/connexion"
            className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded text-center">
            Se connecter pour commenter
          </a>
        )}
      </form>
    </div>
  );
}
