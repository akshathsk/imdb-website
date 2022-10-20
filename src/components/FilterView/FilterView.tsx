import { useState } from "react";
import Gallery from "../Gallery/Gallery";
import "./FilterView.css";
import PropTypes, { InferProps } from "prop-types";

interface GenreProps {
  id?: number;
  name: string;
}

const FilterPropTypes = {
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
  genre: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string })
  ).isRequired,
  setMovieIdHandler: PropTypes.func.isRequired,
};
type FilterTypes = InferProps<typeof FilterPropTypes>;

export default function FilterView(props: FilterTypes) {
  const { genre, movieList } = props;
  const [filteredMovieList, setFilteredMovieList] = useState([...movieList]);
  const [options] = useState({ sortBy: "title", sortValue: "ASC" });

  function onGenreChange(e: any) {
    const value = e.target.name;
    if (value === "All") {
      setFilteredMovieList([...movieList]);
    } else {
      const filtered = movieList.filter((movie: any) =>
        movie.genre_ids.includes(parseInt(value, 10))
      );
      setFilteredMovieList([...filtered]);
    }
  }

  return (
    <div>
      <div className="filter-main-container">
        <div className="button-container">
          <input
            type="button"
            value="All"
            name="All"
            onClick={(e) => onGenreChange(e)}
            className="button"
          />
        </div>
        {genre.map((g: any) => (
          <div key={g.id} className="button-container">
            <input
              type="button"
              value={g.name}
              name={g.id}
              onClick={(e) => onGenreChange(e)}
              className="button"
            />
          </div>
        ))}
      </div>
      <div className="gallery-container">
        <Gallery
          filteredMovieList={filteredMovieList}
          options={options}
          setMovieIdHandler={props.setMovieIdHandler}
        />
      </div>
    </div>
  );
}
