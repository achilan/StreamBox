// components/MovieCard.tsx
import Link from "next/link";
import axios from "axios";
import { Movie } from "./types";

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onClick }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // evitar navegación si usamos <Link href="#">
    try {
      await axios.delete(`http://${process.env.REACT_APP_API_IP}:3001/movies/${movie._id}`);
      onDelete(movie._id); // Llamar al padre para actualizar el estado
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative bg-neutral-900 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 w-72">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover"
        onClick={onClick}
      />
      <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 w-full">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <div className="flex justify-between">
          <Link
            href={`/movie/${movie._id}`}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-1 px-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
