import { useContext } from "react"
import ContentContext from "../contexts/content-context";

const useContent = (key) => {
  const content = useContext(ContentContext)

  const list = content?.db[key] ?? null;
  const setList = (newList) => {
    content.setDb({...content.db, [key]: newList})
  }

  return { list, setList }
}

export default useContent
