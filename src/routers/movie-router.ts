import express from "express";
// import {z} from "zod";
// import { Schema } from "zod";
import validate from "../middleware/validate";
import {movie, SchemaType } from '../zod-schema/movie-schema';

const router = express.Router();

let movies: SchemaType[] = [];

router.get('/', (req, res) => {
    return res.status(200).json(movies);
});

router.post('/', validate(movie), (req, res) => {
    const movie = req.body as SchemaType;
    movies.push(movie);
    return res.status(201).json({message: "Movie Addded."});
});

router.put('/:id', validate(movie), (req,res) =>{
    const updateMovie = req.body as SchemaType;
    const { id } = req.params;
    const updated = movies.filter( (movie) => {
        return movie.id !== id;
    });
    updated.push(updateMovie);
    movies = updated;
    return res.status(201).json({
        message: "Movie Updated"
    });
});

router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    const deleted = movies.filter( (movie) =>{
        return movie.id !== id;
    });
    movies = deleted;
    return res.status(201).json({
        message: "Movie Deleted"
    });
});

router.get('/search/:id', (req, res) => {
    const {id} = req.params;
    const search = movies.filter( (movie) => {
        if (movie.name === id || movie.genre === id ){
            return movie;
        }
    });
    return res.json(search);
});

export default router;