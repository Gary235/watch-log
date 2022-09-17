import STORAGE_KEYS from "../constants/storage-keys";

const deleteData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  location.reload();
}

export default deleteData
