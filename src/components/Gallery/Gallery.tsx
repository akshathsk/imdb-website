import "./Gallery.css";
import PropTypes, { InferProps } from "prop-types";

const GalleryPropTypes = {
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
  setMovieIdHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({
    sortBy: PropTypes.string,
    sortValue: PropTypes.string,
  }).isRequired,
};
type GalleryTypes = InferProps<typeof GalleryPropTypes>;

export default function Gallery(props: GalleryTypes) {
  function onMovieClick(e: any) {
    const { setMovieIdHandler } = props;
    setMovieIdHandler(e.target.id);
  }

  const sort_by = (field: any, reverse: any, primer: any) => {
    const key = primer
      ? function (x: any) {
          return primer(x[field]);
        }
      : function (x: any) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a: any, b: any) {
      return (
        (a = key(a)), (b = key(b)), reverse * (Number(a > b) - Number(b > a))
      );
    };
  };

  props.filteredMovieList.sort(
    sort_by(
      props.options.sortBy,
      props.options.sortValue === "DESC",
      props.options.sortBy === "title"
        ? (a: any) => a.toUpperCase()
        : parseFloat
    )
  );

  return (
    <div className="gallery-main-container">
      {props.filteredMovieList.map((movie: any) => {
        return (
          <div key={movie.id} className="gallery-tile">
            <div className="text-container"> {movie.title} </div>
            <div>
              <img
                alt={movie.poster_path}
                onClick={(e) => onMovieClick(e)}
                id={movie.id}
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                className="image-container"
              />
            </div>
            <div className="text-container">
              {" "}
              <label> Popularity:&nbsp;</label>
              {movie.popularity}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
