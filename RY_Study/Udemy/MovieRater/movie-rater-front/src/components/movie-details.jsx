import classNames from "classnames";
import useApi from "../services/useApi";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";

export default function MovieDetails({movie, updateMovie}) {

    const { data, loading, error, request } = useApi();
    const [ highlighted, setHighlighted ] = useState(-1)
    const [status, setStatus] = useState(null);
    const [token] = useCookies('mr-token')

    const rateMovie = async (rate) => {
        const rateMovie = async () => {
            // const resp = await API.rateMovie(movie.id, { stars: rate }, token['mr-token']);
            const resp = await request({ url: `/api/movies/${movie.id}/rate_movie/`, method: 'POST', body: { stars: rate } });
            if (resp) getNewMovie();

            const message = resp ? 'Successfully rated film' : 'Unsuccessfully rated film';
            setStatus(message);

            setTimeout(() => setStatus(''), 2000);
        }

        rateMovie();
    }
    
    const getNewMovie = async () => {
        const fetchMovie = async () => {
            // const resp = await API.getMovie(movie.id, token['mr-token']);
            // const resp = await request({ url: `/api/movies/${movie.id}` });
            const resp = await request({ url: `/api/movies/${movie.id}/`, method: 'GET' });
            if (resp) updateMovie(resp)
        }

        fetchMovie();
    }

    return (
        <React.Fragment>
            {movie && 
                <div className="text-left">
                    <h1 className="text-xl pb-3"><span className="text-2xl text-purple-400">Title:</span> { movie.title }</h1>
                    <p className="text-lg pb-3"><span className="text-2xl text-purple-400">Description:</span> { movie.description }</p>
                    <div className="flex items-center gap-3">
                        <p className="text-2xl text-purple-400">Rating: </p>
                        <div className="flex items-center">
                            <div className="flex items-center text-lg">
                                <FaStar className={movie.average_rating > 0 && "text-orange-400"}/>
                                <FaStar className={movie.average_rating > 1 && "text-orange-400"}/>
                                <FaStar className={movie.average_rating > 2 && "text-orange-400"}/>
                                <FaStar className={movie.average_rating > 3 && "text-orange-400"}/>
                                <FaStar className={movie.average_rating > 4 && "text-orange-400"}/>
                            </div>

                            <p className="text-base self-end ml-1">({movie.number_of_ratings})</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-t-2 border-gray-600 mt-5 pt-2">
                        <h1 className="text-2xl text-orange-400">Rate the movie!</h1>
                        <div className="flex text-2xl">
                            { [...Array(5)].map( (el, indx) => {
                                return <FaStar key={indx} className={classNames('cursor-pointer text-xl', highlighted > indx && 'text-purple-500')}
                                    onMouseEnter={() => setHighlighted(indx + 1)} 
                                    onMouseLeave={() => setHighlighted(-1)}
                                    onClick={() => rateMovie(indx + 1)}
                                />
                            }) }
                        </div>
                    </div>
                    {status && <p className="text-base text-gray-400">{status}</p>}
                </div>
            }
        </React.Fragment>
    );
}