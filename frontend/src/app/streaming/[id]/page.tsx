"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Movie } from "../../../../components/types";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const EditMovie: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isClient, setIsClient] = useState(false);
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const router = useParams();
  const router_navigate = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const { id } = router;
    if (id && isClient) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`http://192.168.100.56:3001/movies/${id}`);
          setMovie(response.data);
        } catch (err) {
          console.error("Error fetching movie:", err);
        }
      };

      fetchMovie();
    }
  }, [isClient]);

  useEffect(() => {
    if (movie && isClient && videoNode.current) {
      const player = videojs(videoNode.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        loop: true,
        muted: true,
        fluid: true,
      });

      return () => {
        player.dispose();
      };
    }
  }, [movie, isClient]);

  if (!isClient || !movie) return null;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Título en esquina superior izquierda */}
      <div className="absolute top-6 left-6 z-10 opacity-50 flex items-center space-x-4 hover:opacity-100 transition-opacity duration-200">
        <button
          className="text-white px-4 py-2 rounded-md shadow-md transition duration-200"
          onClick={() => router_navigate.back()}
        >
          Back

        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {movie.title}
        </h1>
      </div>

      {/* Video Fullscreen */}
      <video
        ref={videoNode}
        className="video-js vjs-default-skin absolute top-0 left-0 w-full h-full object-cover"
        data-setup="{}"
      >
        <source
          src={`http://192.168.100.56:3001/${movie.movieFile}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default EditMovie;
