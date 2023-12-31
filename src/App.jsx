import React, { useState, useEffect } from 'react';
import "./App.css";
// import { API_URL } from './api';

import SearchIcon from "./search.svg";
import MovieCards from "./movie/MovieCards";


const API_URL = process.env.REACT_APP_API_URL


 const App = () => {
    const [movies, setMovies] = useState([]) //empty array
    const [search, setSearch] = useState(""); //string

    useEffect(() => {

        // receive or get the saved movies from localStorage
        const savedSearchMovie = localStorage.getItem('movie');
        if(savedSearchMovie) {
            searchMovies(JSON.parse(savedSearchMovie))
            setSearch(JSON.parse(savedSearchMovie))
        } else {
            searchMovies("Superman")
        }

    }, []) // so it will only render 1x
    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    


    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchSubmit = () => {
        searchMovies(search)

        // save to localStorage search movie
        localStorage.setItem('movie', JSON.stringify(search))
    }

    const handleSubmitKey = (e) => {
        if(e.key === "Enter"){
            handleSearchSubmit();
        }
    }
  return (
    <div className='app'>
        <h1>MovieLand</h1>
        <div className="search">
            <input type="text" placeholder='Search for Movies.'
            value={search}
            onChange={handleSearch} onKeyDown={handleSubmitKey} />
            <img src={SearchIcon} alt="Search" onClick={handleSearchSubmit} />
        </div>
        {movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie, index) => (
                    <MovieCards key={index} movie={movie} />
                ))}
            </div>
        ): 
            <div className="empty">
                <h2>No Movies Found</h2>
            </div> 
        }

    </div>
  )
}

export default App;