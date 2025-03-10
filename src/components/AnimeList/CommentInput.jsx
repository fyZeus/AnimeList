"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
  const [comment, setComment] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const router = useRouter()

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handlePosting = async (event) => {
    event.preventDefault();
    const data = { anime_mal_id, user_email, comment, username, anime_title };
    const response = await fetch("/api/v1/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const postComment = await response.json();
    if (postComment.isCreated) {
      setIsCreated(true);
      setComment("");
      router.refresh()
    }
    return;
  };

  return (
    <div className="flex flex-col gap-2">
      {isCreated && <p className="text-color-primary">Mesage Sent...</p>}
      <textarea
        onChange={handleInput}
        value={comment}
        className="h-32 w-full text-md p-4"
      />
      <button
        onClick={handlePosting}
        className="px-2 py-3 bg-color-accent w-52"
      >
        Send Comment
      </button>
    </div>
  );
};

export default CommentInput;
