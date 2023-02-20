import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_CALLS = {
  GET_MOVIES: "/movies",
  GET_MOVIE_BY_NAME: "/movies/getByName",
  CREATE_MOVIE: "/movies/create",
  UPDATE_MOVIE: "/movies/update",
  DELETE_MOVIE: "/movies/delete",
}

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

function MovieItem ({movie, setMovies}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  // Edit movie name
  const editMovieName = async (e, movie) => {
    e.preventDefault();

    const form = JSON.stringify({
      id: `${movie.id}`,
      movieName: `${name}`,
    });

    const updateMovie = await axios.put(`${import.meta.env.VITE_API_URL}${API_CALLS.UPDATE_MOVIE}`, form,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Updated Movie Name from ${movie.movieName} to ${updateMovie.data.movieName}`);

    const getMovies = await axios.get(`${import.meta.env.VITE_API_URL}${API_CALLS.GET_MOVIES}`);
    setMovies(getMovies.data);
    setShowForm(!showForm);
    setName("");
  }

  // Delete movie
  const deleteMovie = async (e, movie) => {
    e.preventDefault();

    const form = JSON.stringify({
      id: `${movie.id}`,
    });

    const deleteMovie = await axios.delete(`${import.meta.env.VITE_API_URL}${API_CALLS.DELETE_MOVIE}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: form
      }
    );
    console.log(`Deleted movie ${movie.movieName}`);
    setMovies(deleteMovie.data);
  }

  return (
    <>
      <h2>{movie.movieName}</h2>

      <button className='item-button' onClick={(e) => {deleteMovie(e, movie)}}>Delete</button>
      <button className='item-button' onClick={() => {setShowForm(!showForm)}}>Edit</button>

      {showForm ?               
        <form onSubmit={(e) => {editMovieName(e, movie)}}>
          <input 
            type="text" 
            placeholder='Edit Movie Name' 
            value={name} 
            onChange={(e)=>{setName(e.target.value)}}
          />
          <button type='submit'>Enter</button>
        </form> 
        : 
        <>
        </>
      }
    </>
  )
}

export default App
