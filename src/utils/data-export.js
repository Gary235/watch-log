import fileDownload from "js-file-download"
import getContentTypes from "./get-content-types";
import STORAGE_KEYS from "../constants/storage-keys";

const exportData = () => {
  const data = {};

  data[STORAGE_KEYS.CONTENT_TYPES] = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT_TYPES)) || [];
  getContentTypes().forEach(key => {
    data[key] = JSON.parse(localStorage.getItem(key)) || [];
  })

  fileDownload(JSON.stringify(data, null, 4), "pdv-data.json")
}

export default exportData