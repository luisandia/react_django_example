import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';

function App() {
    const [movies, setMovies] = useState<any>([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState<any>(null);
    const [token, setToken, deleteToken] = useCookies(['mr-token']);
    const [data, loading, error] = useFetch();

    useEffect(() => {
        setMovies(data);
    }, [data]);

    useEffect(() => {
        if (!token['mr-token']) window.location.href = '/';
    }, [token]);

    const loadMovie = (movie: any) => {
        setSelectedMovie(movie);
        setEditedMovie(null);
    };
    const editClicked = (movie: any) => {
        setEditedMovie(movie);
        setSelectedMovie(null);
    };
    const udpatedMovie = (movie: any) => {
        const newMovies = movies.map((mov: any) => {
            if (mov.id === movie.id) {
                return movie;
            }
            return mov;
        });
        setMovies(newMovies);
    };
    const newMovie = () => {
        setEditedMovie({ title: '', description: '' });
        setSelectedMovie(null);
    };

    const movieCreated = (movie: any) => {
        const newMovies = [...movies, movie];
        setMovies(newMovies);
    };
    const removeClicked = (movie: any) => {
        const newMovies = movies.filter((mov: any) => mov.id !== movie.id);
        setMovies(newMovies);
    };
    const logoutUser = () => {
        deleteToken('mr-token');
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading movies</h1>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    <FontAwesomeIcon icon={faFilm} />
                    <span>Movie rater</span>
                </h1>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
            </header>
            <div className="layout">
                <div>
                    <MovieList
                        movies={movies}
                        movieClicked={loadMovie}
                        editClicked={editClicked}
                        removeClicked={removeClicked}
                    />
                    <button onClick={newMovie}>New movie</button>
                </div>
                <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
                {editedMovie ? (
                    <MovieForm
                        movie={editedMovie}
                        udpatedMovie={udpatedMovie}
                        movieCreated={movieCreated}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default App;
