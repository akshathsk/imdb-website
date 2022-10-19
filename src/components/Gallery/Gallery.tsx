import "./Gallery.css";

export default function Gallery(props: any) {
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
          </div>
        );
      })}
    </div>
  );
}
