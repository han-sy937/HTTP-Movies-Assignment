import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        // const removeMovie = movieList.filter(m => m.id !== res.data.id)
          // setMovieList(removeMovie)
          history.push("/")
      })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  // Add a button in the movie component that routes you to your new route with the movies's id as the URL param

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={() => history.push(`/update-movie/${params.id}`)}>Update</div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
}

export default Movie;
