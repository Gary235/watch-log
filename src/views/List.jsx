import { useParams } from "react-router-dom";
import ListPreview from "../components/list-preview/ListPreview"


const ListView = () => {
  const {contentType} = useParams();
  const title = contentType && `${
    contentType.charAt(0).toUpperCase() + contentType.slice(1)
  } List`;

  return (
    <ListPreview title={title} contentType={contentType} full />
  )
}

export default ListView
