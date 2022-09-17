import STORAGE_KEYS from "../constants/storage-keys";
import fileDownload from "js-file-download"

const exportData = () => {
  const data = {};

  Object.values(STORAGE_KEYS).forEach(key => {
    data[key] = JSON.parse(localStorage.getItem(key)) || []
  })

  fileDownload(JSON.stringify(data, null, 4), "pdv-data.json")
}

export default exportData