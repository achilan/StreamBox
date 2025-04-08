"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieForm from '../../../../components/MovieForm';
import { useParams } from 'next/navigation';
import { Movie } from '../../../../components/types';

const EditMovie: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useParams();
  

  useEffect(() => {
    const { id } = router;
    if (id) {
      const fetchMovie = async () => {
        const response = await axios.get(`http://192.168.100.56:3001/movies/${id}`);
        setMovie(response.data);
      };

      fetchMovie();
    }
  }, []);

  return (
    <div>
      <h1>Edit Movie</h1>
      {movie ? <MovieForm movie={movie} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditMovie;
