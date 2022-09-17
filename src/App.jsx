import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import STORAGE_KEYS from "./constants/storage-keys"
import ContentContext from "./contexts/content-context"

import Home from "./views/Home"
import ListView from "./views/List"
import WatchingTab from "./views/WatchingTab"
import WatchListTab from "./views/WatchlistTab"

const App = () => {
  const [anime, setAnime] = useState(null)
  const [manga, setManga] = useState(null)
  const [series, setSeries] = useState(null)
  const [movies, setMovies] = useState(null)
  const [watchList, setWatchList] = useState(null)


  useEffect(() => {
    // const userStored = JSON.parse(localStorage.getItem(USER))

    const animeList  = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANIME))  || []
    const mangaList  = JSON.parse(localStorage.getItem(STORAGE_KEYS.MANGA))  || []
    const seriesList = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERIES)) || []
    const moviesList = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) || []

    const storedWatchList = JSON.parse(localStorage.getItem(STORAGE_KEYS.WATCH_LIST)) || []

    setAnime(animeList);
    setManga(mangaList);
    setSeries(seriesList);
    setMovies(moviesList);
    setWatchList(storedWatchList);
  }, [])


  const value = {
    anime, setAnime,
    manga, setManga,
    series, setSeries,
    movies, setMovies,
    watchList, setWatchList
  }

  return (
    <ContentContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path="watching" element={<WatchingTab />} />
            <Route path="watch-list" element={<WatchListTab />} />
          </Route>
          <Route path="list/:contentType" element={<ListView />} />
        </Routes>
      </BrowserRouter>
    </ContentContext.Provider>
  )
}

export default App
