import { useState } from "react";
import Gallery from "../Gallery/Gallery";
import "./Search.css";

export default function Search(props: any) {
  const [sortType, setSortType] = useState("title");
  const [sortOrder, setSortOrder] = useState("ASC");

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
            <option value="vote_average">Vote Average</option>
          </select>

          <div>
            <input
              type="radio"
              id="ASC"
              name="sortValue"
              value="ASC"
              onChange={(e) => onOptionValueChange(e)}
              checked={sortOrder === "ASC"}
            ></input>
            <label>ASC</label>
          </div>

          <div>
            <input
              type="radio"
              id="DESC"
              name="sortValue"
              value="DESC"
              onChange={(e) => onOptionValueChange(e)}
              checked={sortOrder === "DESC"}
            ></input>
            <label>DESC</label>
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
