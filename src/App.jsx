import { useState, useEffect, useCallback } from 'react';
import './App.css';
import apis from './api/axiosConfig.js';
import Layout from "./components/Layout.jsx";
import {Routes,Route} from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Header from "./components/header/Header.jsx";
import Trailer from "./components/trailer/Trailer.jsx";
import Reviews from "./components/reviews/Reviews.jsx";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [movie,setMovie] = useState(null);
  const [reviews,setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await apis.get("/api/v1/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  const getMovieData = useCallback(async (movieId) => {
        try {
            setMovie(null);
            setReviews([]);
            
            const response = await apis.get(`/api/v1/movies/${movieId}`);
            const singleMovie = response.data;

            const movieReviews = singleMovie.reviewIds || [];
            
            setMovie(singleMovie);
            setReviews(movieReviews);
        } catch (e) {
            console.error("Error fetching movie data:", e);
            setMovie(null);
            setReviews([]);
        }
   },[]);

  const refreshReviews = useCallback(async (movieId) => {
    try {
      const response = await apis.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      const movieReviews = singleMovie.reviewIds || [];
      
      setReviews(movieReviews);
    } catch (e) {
      console.error("Error refreshing reviews:", e);
    }
  }, []);

useEffect(()=>{
  getMovies();
}, [])

  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home movies={movies}/>}></Route>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
              <Route path="/Reviews/:movieId" element={
                <Reviews 
                  getMovieData={getMovieData} 
                  movie={movie} 
                  reviews={reviews}
                  refreshReviews={refreshReviews}
                />
              }></Route>
            </Route>
        </Routes>
    </div>
  )
}