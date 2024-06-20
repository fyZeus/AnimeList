"use client";

import React, { useState } from "react";

const CollectionButton = ({ anime_mal_id, user_email, anime_images, anime_title }) => {
  const [isCreated, setIsCreated] = useState(false);

  const handleCollection = async (event) => {
    event.preventDefault();
    const data = { anime_mal_id, user_email, anime_images, anime_title };
    const response = await fetch("/api/v1/collection", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const collection = await response.json();
    if (collection.isCreated) {
      setIsCreated(true);
    }
    return;
  };
  return (
    <>
      {isCreated ? (
        <p className="text-color-primary">Succes add to Collection</p>
      ) : (
        <button
          onClick={handleCollection}
          className="px-2 py-1 border text-color-primary rounded-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-color-accent hover:text-color-dark duration-300"
        >
          Add to Collection
        </button>
      )}
    </>
  );
};

export default CollectionButton;
