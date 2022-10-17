import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailedView.css";

export default function DetailedView(props: any) {
  const { movieList } = props;
  const params = useParams();
  var movieId: number = parseInt(params.movieId!, 10);
  const [index, setIndex] = useState(
    movieList.findIndex((m: any) => m.id === movieId)
  );
  const [movieDetails, setMovieDetails] = useState<any>(movieList[index]);

  function onClickPrevHandler() {
    if (index === 0) {
      setIndex(movieList.length - 1);
    } else {
      setIndex(index - 1);
    }
    console.log(index);
    setMovieDetails(movieList[index]);
  }

  function onClickNextHandler() {
    if (index === movieList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    console.log(index);
    setMovieDetails(movieList[index]);
  }

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/detailed/" + movieDetails.id);
  }, [movieDetails]);

  return (
    <div className="detailed-view-container">
      <div className="next-prev-button-container">
        <button
          type="button"
          onClick={() => onClickPrevHandler()}
          className="next-prev-button"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onClickNextHandler()}
          className="next-prev-button"
        >
          Next
        </button>
      </div>

      <div className="title">{movieDetails.title}</div>
      <div className="detailed-view">
        <div>
          <img
            className="img-config"
            alt={movieDetails.poster_path}
            src={"https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path}
          />
        </div>
        <div className="details-text">
          <div className="margin">
            <span className="heading">Overview : </span>
            <span>{movieDetails.overview}</span>
          </div>
          <div className="margin">
            <span className="heading">Original Title : </span>
            <span>{movieDetails.original_title}</span>
          </div>
          <div className="margin">
            <span className="heading">Vote Average : </span>
            <span>{movieDetails.vote_average}</span>
          </div>
          <div className="margin">
            <span className="heading">Vote Count : </span>
            <span>{movieDetails.vote_count}</span>
          </div>
          <div className="margin">
            <span className="heading">Popularity : </span>
            <span>{movieDetails.popularity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
