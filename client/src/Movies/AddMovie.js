import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const AddMovie = (props) => {
    const { movieList, setMovieList } = props
    const [form, setForm] = useState(initialValue)
    const history = useHistory()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies`)
            .then(res => {
                console.log(res)
                setMovieList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [movieList])

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies`, setForm)
            .then(res => {
                console.log(res)
                setMovieList([...movieList], res.data)
                history.push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = e => {
        e.persist()
        let value = e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        })
    }

    
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter movie name"
                    onChange={handleChange}
                    value={form.title}
                />
                 <input
                    type="text"
                    name="director"
                    placeholder="Enter director name"
                    onChange={handleChange}
                    value={form.director}
                />
                 <input
                    type="number"
                    name="metascore"
                    placeholder="Enter score"
                    onChange={handleChange}
                    value={form.metascore}
                />
                 <input
                    type="text"
                    name="stars"
                    placeholder="Enter actors' name"
                    onChange={handleChange}
                    value={form.stars}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie