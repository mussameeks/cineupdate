import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useInView } from "react-intersection-observer";

const TrailerCard = ({ movie, trailerKey }) => {
  const playerRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.7, // 70% of card must be visible
  });

  useEffect(() => {
    if (playerRef.current && playerRef.current.internalPlayer) {
      if (inView) {
        playerRef.current.internalPlayer.playVideo();
      } else {
        playerRef.current.internalPlayer.pauseVideo();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center items-center text-white px-4 py-8">
      {trailerKey ? (
        <div className="w-full max-w-md mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg mb-4 bg-black">
            <YouTube
              videoId={trailerKey}
              ref={playerRef}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  enablejsapi: 1,
                  origin: typeof window !== "undefined" ? window.location.origin : "",
                }
              }}
            />
          </div>
          <h2 className="text-center text-2xl font-bold">{movie.title}</h2>
        </div>
      ) : (
        <p className="text-lg">Loading trailer...</p>
      )}
    </div>
  );
};

export default TrailerCard;