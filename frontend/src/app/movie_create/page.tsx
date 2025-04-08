// pages/movie/create.tsx
import MovieForm from '../../../components/MovieForm';

const CreateMovie: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen justify-center flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Create a New Movie</h1>
      <MovieForm />
    </div>
  );
};

export default CreateMovie;
