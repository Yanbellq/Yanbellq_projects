import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import Button from './components/button';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { RiAddCircleFill } from "react-icons/ri";


function App() {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);
    const [updatedMovie, setUpdatedMovie] = useState(null);
    const [newMovie, setNewMovie] = useState(null);
    const [cookie, setCookie, deleteCookie] = useCookies('mr-token');
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookie['mr-token']) navigate('/')
    }, [cookie])

    const movieClicked = (movie, isEdit) => {
        if (isEdit) {
            setSelectedMovie(null);
            setEditedMovie(movie)
        } else {
            setSelectedMovie(movie);
            setEditedMovie(null)
        }
    }

    const createNewMovie = () => {
        setSelectedMovie(null);
        setEditedMovie({title: '', description: ''})
    }

    const logoutUser = () => {
        deleteCookie(['mr-token']);
        navigate('/');
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className='p-10 border-b-2 border-orange-500 mb-5 text-4xl'>Movie Rater</h1>

                <FaSignOutAlt className='cursor-pointer fixed top-5 right-3 text-4xl' onClick={() => logoutUser()} />

                <div className='grid grid-cols-2 gap-12'>
                    <div>
                        <MovieList movieClicked={movieClicked} updatedMovie={updatedMovie} newMovie={newMovie} setEditedMovie={setEditedMovie}/>
                        <Button onClick={() => createNewMovie()} info={<span className='flex items-center gap-1'><RiAddCircleFill /> Create New Movie</span>}/>
                    </div>

                    <div className='pl-12'>
                        <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie} />
                        {editedMovie && <MovieForm movie={editedMovie} updateMovie={setUpdatedMovie} addNewMovie={setNewMovie}/>}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
