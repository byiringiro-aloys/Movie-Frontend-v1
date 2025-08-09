import { useState, useEffect } from 'react';
import './App.css';
import apis from './api/axiosConfig.js';
import Layout from "./components/Layout.jsx";
import {Routes,Route} from 'react-router-dom';
import Home from './components/home/Home.jsx';

export default function App() {

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {

      const response = await apis.get("/api/v1/movies");
      setMovies(response.data);

    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>{
  getMovies();
},[])


  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home movies={movies}/>}></Route>
            </Route>
        </Routes>
    </div>
  )
}

