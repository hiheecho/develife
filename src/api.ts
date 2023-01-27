const BaseURL =
  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=';
const API_KEY = 'AIzaSyDdIYqOmNFY1P0evPTxUKP5mPYwLL5HvnA';

export const getAll = () =>
  fetch(
    `${BaseURL}PL1V8Ky17d9SudCHJb1F2pHBvIMFBlpfad&maxResults=30&key=${API_KEY}`,
  ).then((res) => res.json());

export const getHomeTrainning = () =>
  fetch(
    `${BaseURL}PL1V8Ky17d9SsLTlGDLXle3MYWVOYLJw6v&maxResults=30&key=${API_KEY}`,
  ).then((res) => res.json());

export const getProgramming = () =>
  fetch(
    `${BaseURL}PL1V8Ky17d9SsxqbjG8UJIOQ0tE-4qxdkb&maxResults=30&key=${API_KEY}`,
  ).then((res) => res.json());

export const getItItem = () =>
  fetch(
    `${BaseURL}PL1V8Ky17d9SswmUiJaeTohRvJf-bGFrU5&maxResults=30&key=${API_KEY}`,
  ).then((res) => res.json());
