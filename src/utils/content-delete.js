import { showNotification } from "@mantine/notifications";

const deleteContent = (id, storageKey, callback) => {
  const storedList = JSON.parse(localStorage.getItem(storageKey)) || []
  
  const index = storedList.findIndex(item => item.id === id);

  const newList = [
    ...storedList.slice(0, index),
    ...storedList.slice(index + 1),
  ]
  localStorage.setItem(storageKey, JSON.stringify(newList))
  callback(newList)
  showNotification({
    title: `You've deleted ${storedList[index].title} succesfully`,
    message: `Congrats, ${storedList[index].title} was deleted.`,
    color: 'teal'
  });
}

export default deleteContent
