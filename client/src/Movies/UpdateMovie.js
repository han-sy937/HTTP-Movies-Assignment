import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovie = (props) => {
    const [updateMovie, setUpdateMovie] = useState(initialValue)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                // console.log(res.data)
                setUpdateMovie(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    const handleChange = e => {
        e.persist()
        let value = e.target.value;
        // if(e.target.name === "metascore") {
        //     value = parseInt(value, 10)
        // }
        setUpdateMovie({
            ...updateMovie,

            [e.target.name]: value
        })
        // console.log(updateMovie)
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
            .then((res) => {
                // console.log(res)
                const updatedMovies = props.movieList.map((movie) => {
                    if (movie.id === res.data.id) {
                      return res.data;
                    }
                    return movie;
                  });

                  props.setMovieList(updatedMovies);
                  history.push(`/`);
                })
                .catch((err) => {
                  console.log(err);
                });
    }


    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter movie name"
                    onChange={handleChange}
                    value={updateMovie.title}
                />
                 <input
                    type="text"
                    name="director"
                    placeholder="Enter director name"
                    onChange={handleChange}
                    value={updateMovie.director}
                />
                 <input
                    type="number"
                    name="metascore"
                    placeholder="Enter score"
                    onChange={handleChange}
                    value={updateMovie.metascore}
                />
                 <input
                    type="text"
                    name="stars"
                    placeholder="Enter actors' name"
                    onChange={handleChange}
                    value={updateMovie.stars}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie