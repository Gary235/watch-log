import STORAGE_KEYS from "../constants/storage-keys"

import ListPreview from "../components/list-preview/ListPreview"


const WatchingTab = () => {

  return (
    <>
      <ListPreview title={'Manga List'} contentType={STORAGE_KEYS.MANGA} />
      <ListPreview title={'Anime List'} contentType={STORAGE_KEYS.ANIME} />
      {/* <ListPreview title={'Series List'} contentType={STORAGE_KEYS.SERIES} /> */}
      {/* <ListPreview title={'Movies List'} contentType={STORAGE_KEYS.MOVIES} /> */}
    </>
  )
}

export default WatchingTab