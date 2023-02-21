import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieItem from './MovieItem';
import API_CALLS from './API_CALLS';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}${API_CALLS.GET_MOVIES}`);
      setMovies(res.data);
    }

    fetchMovies();
  }, []);

  const createMovie = async (e) => {
    e.preventDefault();
    const form = JSON.stringify({
      movieName: `${movieName}`,
    });

    const createMovie = await axios.post(`${import.meta.env.VITE_API_URL}${API_CALLS.CREATE_MOVIE}`, form,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Created Movie ${createMovie.data}`);
    const getMovies = await axios.get(`${import.meta.env.VITE_API_URL}${API_CALLS.GET_MOVIES}`);
    setMovies(getMovies.data);
    setMovieName("");
  }

  return (
    <div className="App">
      <h1>Movies</h1>
      <form onSubmit={(e) => {createMovie(e)}}>
        <input 
          type='text'
          placeholder='Enter Movie Name' 
          value={movieName} 
          onChange={(e)=>{setMovieName(e.target.value)}}
        />
        <button type='submit'>Enter</button>
      </form>

      <div className='movies'>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieItem movie={movie} setMovies={setMovies}/>
          </div>
        ))}
      </div>
    </div>
  )
}



export default App
