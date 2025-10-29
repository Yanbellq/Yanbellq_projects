import React, { useState, useEffect } from "react"
import Button from "./button";
import FormControl from "./form-control";
import useApi from "../services/useApi";
import { useCookies } from "react-cookie";

export default function MovieForm({movie, updateMovie, addNewMovie}) {

    const { data, loading, error, request } = useApi();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies('mr-token')

    useEffect( () => {
        setTitle(movie.title);
        setDescription(movie.description);
    }, [movie])

    const saveMovie = async () => {
        // API.updateMovie(movie.id, {title: title, description: description});
        // const resp = await API.updateMovie(movie.id, {title, description}, token['mr-token']);
        const resp = await request({ url: `/api/movies/${movie.id}/`, method: 'PUT', body: {title, description} });
        if (resp) updateMovie(resp);
    }
    
    const createMovie = async () => {
        // API.updateMovie(movie.id, {title: title, description: description});
        // const resp = await API.createMovie({title, description}, token['mr-token']);
        const resp = await request({ url: '/api/movies/', method: 'POST', body: {title, description} });
        if (resp) addNewMovie(resp);
    }

    const isDisabled = title === '' || description === '';

    return (
        <React.Fragment>
            {movie && 
                <div className="flex flex-col gap-3 w-[35rem] text-gray-500">

                    <FormControl 
                        Label='Title: '
                        For='title' 
                        Id='title' 
                        Type='text' 
                        Placeholder='Enter your title' 
                        Value={title} 
                        OnChange={(evt) => setTitle(evt.target.value)}
                        classAddControl='text-white'
                    />
                    
                    <FormControl 
                        Label='Description: '
                        For='description' 
                        Id='description' 
                        Type='text' 
                        Placeholder='Enter your description' 
                        Value={description} 
                        OnChange={(evt) => setDescription(evt.target.value)}
                        classAddControl='text-white resize-none'
                        Control='textarea'
                    />

                    { movie.id ? 
                        <Button classAdd='text-white w-[10rem] flex items-center btn mx-auto' onClick={() => saveMovie()} disabled={isDisabled} info={<span className="mx-auto">Update movie</span>}/> :
                        <Button classAdd='text-white w-[10rem] flex items-center btn mx-auto' onClick={() => createMovie()} disabled={isDisabled} info={<span className="mx-auto">Create movie</span>}/>
                    }
                </div>
            }
        </React.Fragment>
    )
}