import { useState } from "react";
import Gallery from "./Gallery";
import "./FilterView.css";

export default function FilterView(props: any) {
  const { genre, movieList } = props;
  const [filteredMovieList, setFilteredMovieList] = useState([...movieList]);
  const [options] = useState({ sortBy: "title", sortValue: "ASC" });

  function onGenreChange(e: any) {
    const value = e.target.name;
    if (value == "All") {
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
          <div className="button-container">
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
        <Gallery filteredMovieList={filteredMovieList} options={options} />
      </div>
    </div>
  );
}
