import { showNotification } from "@mantine/notifications";

const editContent = (editedItem, storageKey, callback) => {
  const storedList = JSON.parse(localStorage.getItem(storageKey)) || []

  const index = storedList.findIndex(item => item.id === editedItem.id);

  const newList = [
    editedItem,
    ...storedList.slice(0, index),
    ...storedList.slice(index + 1),
  ]
  localStorage.setItem(storageKey, JSON.stringify(newList))

  callback(newList, storageKey)
  showNotification({
    title: `You've edited ${editedItem.title} succesfully`,
    message: `Congrats, ${editedItem.title} was updated.`,
    color: 'teal'
  });
}

export default editContent
