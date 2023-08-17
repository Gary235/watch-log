import { showNotification } from "@mantine/notifications";
import STORAGE_KEYS from "../constants/storage-keys";

const addContentType = (newType, callback) => {
  const storedList = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT_TYPES)) || []

  const parsedType = newType.trim().toLowerCase()
  const newList = [parsedType, ...storedList];

  localStorage.setItem(STORAGE_KEYS.CONTENT_TYPES, JSON.stringify(newList))

  callback(null, storageKey)
  showNotification({
    title: `You've added ${newType} succesfully`,
    message: `Congrats, ${newType} was added.`,
    color: 'teal'
  });
}

export default addContentType
