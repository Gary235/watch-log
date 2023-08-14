import STORAGE_KEYS from "../constants/storage-keys";

const getContentTypes = () => {
  let types = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT_TYPES)) || [];

  if (types.length === 0) {
    localStorage.setItem(STORAGE_KEYS.CONTENT_TYPES, JSON.stringify(['watch-list']));
    types = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT_TYPES));
  }

  return types;
}


export default getContentTypes