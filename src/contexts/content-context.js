import React from 'react'

const ContentContext = React.createContext({
  anime: null,  setAnime: null,
  manga: null,  setManga: null,
  series: null, setSeries: null,
  movies: null, setMovies: null,
  watchList: null, setWatchList: null
})

export default ContentContext
