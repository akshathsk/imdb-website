import { useEffect, useState } from "react";
import "./App.css";
import Search from "./Search";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import Header from "./Header";
import FilterView from "./FilterView";
import DetailedView from "./DetailedView";

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
            if (!ids.includes(element.id)) {
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
  }, []);

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
              <Link to="/">
                <div className="link">SEARCH</div>
              </Link>
              <Link to="/gallery">
                <div className="link">GALLERY</div>
              </Link>
            </div>
            <Routes>
              <Route
                path="/"
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
                path="/gallery"
                element={<FilterView genre={genre} movieList={movieList} />}
              />
              <Route
                path="/detailed/:movieId"
                element={<DetailedView movieList={movieList} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
