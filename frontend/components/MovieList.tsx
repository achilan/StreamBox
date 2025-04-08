// components/MovieList.tsx
import { Movie } from './types';
import MovieCard from './MovieCard';
import { useRouter } from 'next/navigation';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }:any) => {
  const router = useRouter();
  const onClick = (movie: Movie) => {
    console.log('Movie clicked:', movie._id);
    router.push(`/streaming/${movie._id}`); // Navigate to the movie details page
  };
  return (
    <div className="flex flex-wrap gap-4">
      {movies.map((movie:any) => (
        <MovieCard key={movie._id} movie={movie} onClick={() => onClick(movie)} />
      ))}
    </div>
  );
};

export default MovieList;
