"use client";
import { XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const option = {
    width: "300",
    height: "250",
  };

  const ButtonOpenTrailer = () => {
    return (
      <button
        className="fixed bottom-5 right-5 w-40 border text-color-primary rounded-md p-4 m-7 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-color-accent hover:text-color-dark duration-300"
        onClick={handleVideoPlayer}
      >
        See Trailers
      </button>
    );
  };

  const Player = () => {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          className="text-color-primary float-right"
          onClick={handleVideoPlayer}
        >
          <XCircle size={32} />
        </button>
        <YouTube
          videoId={videoId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          onError={() => alert("Can't play video")}
        />
      </div>
    );
  };
  return isOpen ? <Player /> : <ButtonOpenTrailer />;
};

export default VideoPlayer;
