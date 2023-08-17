import { showNotification } from "@mantine/notifications";
import generateId from "./generate-id"

const addContent = (newItem, storageKey, callback) => {
  const storedList = JSON.parse(localStorage.getItem(storageKey)) || []
  const id = generateId()

  const completedNewItem = {id, ...newItem};
  const newList = [completedNewItem, ...storedList];

  localStorage.setItem(storageKey, JSON.stringify(newList))

  callback(newList, storageKey)
  showNotification({
    title: `You've added ${newItem.title} succesfully`,
    message: `Congrats, ${newItem.title} was added.`,
    color: 'teal'
  });
}

export default addContent
