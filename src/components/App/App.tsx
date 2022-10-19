import { useEffect, useState } from "react";
import "./App.css";
import Search from "../Search/Search";
import axios from "axios";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import FilterView from "../FilterView/FilterView";
import DetailedView from "../DetailedView/DetailedView";
import PropTypes, { InferProps } from "prop-types";

interface GenreProps {
  id?: number;
  name: string;
}

export default function App(this: any) {
  const MoviePropTypes = {
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
  };
  type MovieTypes = InferProps<typeof MoviePropTypes>;
  const [movieList, setMovieList] = useState<MovieTypes[]>([]);
  const [filteredMovieList, setFilteredMovieList] = useState<MovieTypes[]>([]);
  const [options, setOptions] = useState({ sortBy: "title", sortValue: "ASC" });
  const GenrePropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
  };
  const [genre, setGenre] = useState<GenreProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [movieId, setMovieId] = useState<any>();
  const [index, setIndex] = useState<any>();
  const [movieDetails, setMovieDetails] = useState<any>();
  const [forceNav, setForceNav] = useState(false);

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
          const test =
            '{"genres":[{"id":"28","name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"ScienceFiction"},{"id":10770,"name":"TVMovie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}';
          var obj = JSON.parse(test);
          setGenre([...obj.genres]);
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

  const navigate = useNavigate();
  function setMovieIdHandler(movieId: any) {
    setMovieId(movieId);
    let idx = movieList.findIndex((m: any) => m.id === parseInt(movieId, 10));
    setIndex(idx);

    setMovieDetails(movieList[idx]);
    setForceNav(!forceNav);
  }

  function setIndexHandler(idx: any) {
    setIndex(idx);
    setMovieDetails(movieList[idx]);
    setMovieId(movieList[idx].id.toString());
  }
  const location = useLocation();

  useEffect(() => {
    let id =
      location.pathname.split("/").length > 3
        ? location.pathname.split("/")[3]
        : undefined;
    if (movieDetails !== undefined) {
      if (id === undefined) {
        navigate("/mp2/detailed/" + movieId);
      } else if (parseInt(movieId!, 10) !== parseInt(id, 10)) {
        navigate("/mp2/detailed/" + movieId);
      }
    }
  }, [forceNav, movieId]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    setMovieIdHandler={setMovieIdHandler}
                  />
                }
              />
              <Route
                path="/mp2/gallery"
                element={
                  <FilterView
                    genre={genre}
                    movieList={movieList}
                    setMovieIdHandler={setMovieIdHandler}
                  />
                }
              />
              <Route
                path="/mp2/detailed/:movieId"
                element={
                  <DetailedView
                    movieList={movieList}
                    genre={genre}
                    index={index}
                    movieDetails={movieDetails}
                    setMovieIdHandler={setMovieIdHandler}
                    setIndexHandler={setIndexHandler}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
