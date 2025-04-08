// components/MovieForm.tsx
"use client";
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface MovieFormProps {
  movie?: {
    _id: string;
    title: string;
    posterUrl: string;
    movieFile: string;
  };
}

const MovieForm: React.FC<MovieFormProps> = ({ movie }) => {
  const [title, setTitle] = useState<string>('');
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setPosterUrl(movie.posterUrl);
    }
  }, [movie]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('posterUrl', posterUrl);
    if (movieFile) formData.append('movieFile', movieFile);

    try {
      if (movie) {
        await axios.put(`http://192.168.100.56:3001/movies/${movie._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://192.168.100.56:3001/movies', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 container mx-auto'>
      <div className='flex flex-col gap-2'>
        <label>Title</label>
        <input
          className='border-2 border-gray-300 p-2 rounded-md'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label>Poster URL</label>
        <input
          className='border-2 border-gray-300 p-2 rounded-md'
          type="text"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label>Movie File</label>
        <input
          className='border-2 border-gray-300 p-2 rounded-md'
          type="file"
          onChange={(e) => setMovieFile(e.target.files ? e.target.files[0] : null)}
          required={!movie}
        />
      </div>
      <button
        className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300' 
       type="submit">
        {movie ? 'Update Movie' : 'Create Movie'}</button>
      <button
        className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300'
        type="button"
        onClick={() => router.push('/')}
      >
        Cancel</button>
    </form>
  );
};

export default MovieForm;
