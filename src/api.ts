import { useQuery } from "react-query";

const API_KEY = "7dfdfee1a73b8c181efd9651439aa559";
const BASE_PATH = "https://api.themoviedb.org/3";
const NOW_PLAYING = "now_playing";
const LATEST = "latest";
const TOP_RATED = "top_rated";
const UPCOMING = "upcoming";
const AIRING = "airing_today";
const POPULAR = "popular";

interface IMOVIE {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMOVIE[];
  total_pages?: number;
  total_result?: number;
}

function getMovies(url: string) {
  return fetch(
    `${BASE_PATH}/movie/${url}?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((res) => res.json());
}

function getNowPlayingMovies() {
  return getMovies(NOW_PLAYING);
}

export function getLatestMovies() {
  return getMovies(LATEST);
}

function getTopRatedMovies() {
  return getMovies(TOP_RATED);
}
function getUpcomingMovies() {
  return getMovies(UPCOMING);
}

export const useMultipleFetchingMovies = () => {
  const nowPlaying = useQuery<IGetMoviesResult>(
    ["movie", `${NOW_PLAYING}`],
    getNowPlayingMovies
  );
  const topRated = useQuery<IGetMoviesResult>(
    ["movie", `${TOP_RATED}`],
    getTopRatedMovies
  );
  const upComing = useQuery<IGetMoviesResult>(
    ["movie", `${UPCOMING}`],
    getUpcomingMovies
  );
  return [nowPlaying, topRated, upComing];
};

interface ITV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string | number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name?: string;
  title?: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

function fetchTv(url: string) {
  return fetch(
    `${BASE_PATH}/tv/${url}?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((res) => res.json());
}

function getTv(url: string) {
  return fetchTv(url).then((json: IGetTvResult) => ({
    ...json,
    results: json.results.map((data) => ({
      ...data,
      title: data.name,
      id: Number(data.id),
      name: undefined,
    })),
  }));
}

function getTopRatedTv() {
  return getTv(TOP_RATED);
}

function getAiringTv() {
  return getTv(AIRING);
}

function getPopularTv() {
  return getTv(POPULAR);
}

export const useMultipleFetchingTv = () => {
  const airing = useQuery<IGetTvResult>(["TV", `${AIRING}`], getAiringTv);
  const popular = useQuery<IGetTvResult>(["TV", `${POPULAR}`], getPopularTv);
  const topRated = useQuery<IGetTvResult>(
    ["TV", `${TOP_RATED}`],
    getTopRatedTv
  );
  return [airing, popular, topRated];
};

export const getSearch = (search: string) => {
  return fetch(`${BASE_PATH}/search/movie?query=${search}&api_key=${API_KEY}`).then(res => res.json)
}