import { useEffect, useState } from "react";
import "./App.css";
import Search from "../Search/Search";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import FilterView from "../FilterView/FilterView";
import DetailedView from "../DetailedView/DetailedView";
import PropTypes from "prop-types";

export default function App(this: any) {
  let result: any[] = [];
  const [movieList, setMovieList] = useState(result);
  let filteredResult: any[] = [];
  const [filteredMovieList, setFilteredMovieList] = useState(filteredResult);
  const [options, setOptions] = useState({ sortBy: "title", sortValue: "ASC" });
  const genreResult: any[] = [];
  const [genre, setGenre] = useState(genreResult);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var count = 1;
    const api = axios.create({
      baseURL: "https://api.themoviedb.org/",
    });

    const getMovieList = (pageNumber: any) =>
      api
        .get(
          "3/discover/movie?api_key=fded5dbbbb84c28c911ba119033c2f13&language=en-US&page=" +
            pageNumber
        )
        .then((res) => {
          var arr = movieList;
          var ids = movieList.map((movie) => movie.id);
          var result = res.data.results;
          result.forEach((element: any) => {
            if (element.title.length < 25 && !ids.includes(element.id)) {
              arr.push(element);
            }
          });
          setMovieList(arr);
          setFilteredMovieList(arr);
          if (movieList.length >= 99) {
            setLoading(false);
          } else {
            getMovieList(count++);
          }
        });

    const getGenreList = () =>
      api
        .get(
          "3/genre/movie/list?api_key=fded5dbbbb84c28c911ba119033c2f13&language=en-US"
        )
        .then((res) => {
          setGenre([...res.data.genres]);
        });
    getMovieList(count);
    getGenreList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearchChange(event: any) {
    const { value } = event.target;
    const filtered = movieList.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(value.toLowerCase()) ||
        movie.original_title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovieList(filtered);
  }

  function handleOptionsChange({ sortBy, sortValue }: any) {
    setOptions({ sortBy, sortValue });
  }

  return (
    <>
      {!loading && (
        <div>
          <div>
            <header>
              <Header />
            </header>
            <div className="link-container">
              <Link to="/mp2/">
                <div className="link">SEARCH</div>
              </Link>
              <Link to="/mp2/gallery">
                <div className="link">GALLERY</div>
              </Link>
            </div>
            <Routes>
              <Route
                path="/mp2/"
                element={
                  <Search
                    handleSearchChange={handleSearchChange}
                    handleOptionsChange={handleOptionsChange}
                    options={options}
                    filteredMovieList={filteredMovieList}
                  />
                }
              />
              <Route
                path="/mp2/gallery"
                element={<FilterView genre={genre} movieList={movieList} />}
              />
              <Route
                path="/mp2/detailed/:movieId"
                element={<DetailedView movieList={movieList} genre={genre} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

App.propTypes = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.array,
      id: PropTypes.number.isRequired,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    })
  ).isRequired,

  filteredMovieList: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.array,
      id: PropTypes.number.isRequired,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    })
  ).isRequired,

  genre: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};

App.defaultProps = {
  movieList: [],
  filteredMovieList: [],
  genre: [],
};