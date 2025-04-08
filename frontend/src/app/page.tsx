"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../components/types";
import MovieList from "../../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log(process.env)
      const response = await axios.get(`http://${process.env.REACT_APP_API_IP}:3001/movies`);
      setMovies(response.data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Movies</h1>
        <Link
          href="/movie_create"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          + Add Movie
        </Link>
      </div>

      {/* Lista de películas */}
      <MovieList movies={movies} />
    </div>
  );
}
