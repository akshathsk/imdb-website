import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailedView.css";
import PropTypes, { InferProps } from "prop-types";

const DetailedPropTypes = {
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
  movieDetails: {
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.array,
    id: PropTypes.number.isRequired,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  },
  genre: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string })
  ).isRequired,
  index: PropTypes.number.isRequired,
  setMovieIdHandler: PropTypes.func.isRequired,
  setIndexHandler: PropTypes.func.isRequired,
};
type DetailedTypes = InferProps<typeof DetailedPropTypes>;

export default function DetailedView(props: DetailedTypes) {
  const {
    movieList,
    genre,
    index,
    movieDetails,
    setMovieIdHandler,
    setIndexHandler,
  } = props;
  const params = useParams();

  const [detailedIndex, setDetailedIndex] = useState<number>(index);
  const [movieDetailedViewObj, setMovieDetailedViewObj] =
    useState<any>(movieDetails);
  const [visible, setVisible] = useState<boolean>(false);

  function getGenere(genereIdArray: any) {
    let genreResult: any[] = [];
    genre.forEach((element: any) => {
      if (genereIdArray.includes(element.id)) {
        genreResult.push(element.name);
      }
    });
    return genreResult.toString();
  }

  useEffect(() => {
    setDetailedIndex(index);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMovieDetailedViewObj(movieDetails);
  }, [movieDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!movieDetails) {
      let idx = movieList.findIndex(
        (m: any) => m.id === parseInt(params.movieId!, 10)
      );
      setDetailedIndex(idx);
      setMovieDetailedViewObj(movieList[idx]);
    }
  }, [movieDetailedViewObj]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (movieDetails && detailedIndex && !visible) {
      setVisible(true);
    }
  }, [movieDetails, detailedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMovieIdHandler(params.movieId);
  }, [params.movieId]); // eslint-disable-line react-hooks/exhaustive-deps

  function onClickPrevHandler() {
    let idx = detailedIndex;
    if (idx === 0) {
      idx = movieList.length - 1;
    } else {
      idx = idx - 1;
    }
    setIndexHandler(idx);
  }

  function onClickNextHandler() {
    let idx = detailedIndex + 1;
    if (idx === movieList.length) {
      idx = 0;
    }
    setIndexHandler(idx);
  }

  return (
    <>
      {visible && (
        <div className="detailed-view-container">
          <div className="next-prev-button-container">
            <button
              type="button"
              onClick={() => onClickPrevHandler()}
              className="next-prev-button"
            >
              <i className="arrow left"></i>
            </button>
            <button
              type="button"
              onClick={() => onClickNextHandler()}
              className="next-prev-button"
            >
              <i className="arrow right"></i>
            </button>
          </div>

          <div className="title">{movieDetailedViewObj.title}</div>
          <div className="detailed-view">
            <div>
              <img
                className="img-config"
                alt={movieDetailedViewObj.poster_path}
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  movieDetailedViewObj.poster_path
                }
              />
            </div>
            <div className="details-text">
              <div className="margin">
                <span className="heading">Overview : </span>
                <span>{movieDetailedViewObj.overview}</span>
              </div>
              <div className="margin">
                <span className="heading">Original Title : </span>
                <span>{movieDetailedViewObj.original_title}</span>
              </div>
              <div className="margin">
                <span className="heading">Release Date : </span>
                <span>{movieDetailedViewObj.release_date}</span>
              </div>
              <div className="margin">
                <span className="heading">Vote Average : </span>
                <span>{movieDetailedViewObj.vote_average}</span>
              </div>
              <div className="margin">
                <span className="heading">Vote Count : </span>
                <span>{movieDetailedViewObj.vote_count}</span>
              </div>
              <div className="margin">
                <span className="heading">Popularity : </span>
                <span>{movieDetailedViewObj.popularity}</span>
              </div>
              <div className="margin">
                <span className="heading">Genere : </span>
                <span>{getGenere(movieDetailedViewObj.genre_ids)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
