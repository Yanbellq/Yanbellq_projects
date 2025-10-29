import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useApi from "../services/useApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function MovieList({movieClicked, newMovie, updatedMovie, setEditedMovie}) {

    const { data, loading, error, request } = useApi();
    const [movies, setMovies] = useState([]);
    const [token] = useCookies('mr-token');


    useEffect(() => {
        request({ url: '/api/movies/', method: 'GET' })
            .then(data => {
                setMovies(data);
            })
    }, [])

    useEffect(() => {
        setMovies([...movies, newMovie])
    }, [newMovie])
    
    useEffect(() => {
        const newMovies = movies.map(movie => 
            movie.id === updatedMovie.id ? updatedMovie : movie
        );
        setMovies(newMovies);
    }, [updatedMovie])

    if (loading) return <h1>Loading</h1>
    if (error) return <h1>{error}</h1>

    const deleteMovie = (movieToDelete) => {
        const resp = request({ url: `/api/movies/${movieToDelete.id}/`, method: 'DELETE' })

        if (resp) {
            const newMovies = movies.filter(movie => movie.id !== movieToDelete.id);
            setMovies(newMovies)
            setEditedMovie(null);
        }
    }

    return (
        <div className="block">
            {movies.map(movie => {
                return (
                    <ul key={movie.id}>
                        <li className="text-xl cursor-pointer flex content-between items-center p-3">
                            <h2 onClick={(evt) => { movieClicked(movie, false) }}>{ movie.title }</h2>
                            <div className="ml-auto flex items-center gap-3">
                                <FaEdit className="hover:text-purple-600 transition-colors duration-75" onClick={(evt) => { movieClicked(movie, true) }} />
                                <MdDelete className="hover:text-purple-600 transition-colors duration-75" onClick={(evt) => { deleteMovie(movie) }} />
                            </div>
                        </li>
                    </ul>
                )
            })}
        </div>
    );
}