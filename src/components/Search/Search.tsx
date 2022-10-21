import { useState } from "react";
import Gallery from "../Gallery/Gallery";
import "./Search.css";
import PropTypes, { InferProps } from "prop-types";

const SearchPropTypes = {
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
  handleSearchChange: PropTypes.func.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  setMovieIdHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({
    sortBy: PropTypes.string,
    sortValue: PropTypes.string,
  }).isRequired,
};
type SearchTypes = InferProps<typeof SearchPropTypes>;

export default function Search(props: SearchTypes) {
  const [sortType, setSortType] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("ASC");

  function onOptionValueChange(e: any) {
    const target = e.target;
    props.handleOptionsChange({
      ...props.options,
      [target.name]: target.value,
    });
    if (target.type === "radio") {
      setSortOrder(target.value);
    } else {
      setSortType(target.value);
    }
  }

  return (
    <div>
      <div className="search-filter-container">
        <input
          className="search-input"
          onChange={(e) => props.handleSearchChange(e)}
        />

        <div className="search-items-container">
          <select
            name="sortBy"
            id="sortMovies"
            value={sortType}
            onChange={onOptionValueChange}
          >
            <option value="title">Title</option>
            <option value="popularity">Popularity</option>
          </select>

          <div>
            &nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              id="ASC"
              name="sortValue"
              value="ASC"
              onChange={(e) => onOptionValueChange(e)}
              checked={sortOrder === "ASC"}
            ></input>
            <label>&nbsp;ASCENDING&nbsp;</label>
          </div>

          <div>
            &nbsp;
            <input
              type="radio"
              id="DESC"
              name="sortValue"
              value="DESC"
              onChange={(e) => onOptionValueChange(e)}
              checked={sortOrder === "DESC"}
            ></input>
            <label>&nbsp;DESCENDING&nbsp;</label>
          </div>
        </div>
      </div>
      <div className="gallery-container">
        <Gallery
          filteredMovieList={props.filteredMovieList}
          options={props.options}
          setMovieIdHandler={props.setMovieIdHandler}
        />
      </div>
    </div>
  );
}
