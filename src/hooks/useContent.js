import { useContext } from "react"
import STORAGE_KEYS from "../constants/storage-keys";
import ContentContext from "../contexts/content-context";

const useContent = (key) => {
  const content = useContext(ContentContext)
  
  switch(key) {
    case STORAGE_KEYS.ANIME:  return {list: content.anime,  setList: content.setAnime};
    case STORAGE_KEYS.MANGA:  return {list: content.manga,  setList: content.setManga};
    case STORAGE_KEYS.SERIES: return {list: content.series, setList: content.setSeries};
    case STORAGE_KEYS.MOVIES: return {list: content.movies, setList: content.setMovies};
    case STORAGE_KEYS.WATCH_LIST: return {list: content.watchList, setList: content.setWatchList};
  }
}

export default useContent
