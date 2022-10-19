import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailedView.css";

export default function DetailedView(props: any) {
  const { movieList, genre } = props;
  const params = useParams();
  var movieId: number = parseInt(params.movieId!, 10);
  const [index, setIndex] = useState(
    movieList.findIndex((m: any) => m.id === movieId)
  );
  const [movieDetails, setMovieDetails] = useState<any>(movieList[index]);

  function getGenere(genereIdArray: any) {
    let genreResult: any[] = [];
    genre.forEach((element: any) => {
      if (genereIdArray.includes(element.id)) {
        genreResult.push(element.name);
      }
    });
    return genreResult.toString();
  }

  function onClickPrevHandler() {
    let idx = index;
    if (idx === 0) {
      idx = movieList.length - 1;
    } else {
      idx = idx - 1;
    }
    setIndex(idx);
    setMovieDetails(movieList[idx]);
  }

  function onClickNextHandler() {
    let idx = index + 1;
    if (idx === movieList.length) {
      idx = 0;
    }
    setIndex(idx);
    setMovieDetails(movieList[idx]);
  }

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/mp2/detailed/" + movieDetails.id);
  }, [movieDetails]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <div className="margin">
            <span className="heading">Genere : </span>
            <span>{getGenere(movieDetails.genre_ids)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
