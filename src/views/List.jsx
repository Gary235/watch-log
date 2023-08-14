import { useParams } from "react-router-dom";
import ListPreview from "../components/list-preview/ListPreview"
import { useState } from "react";
import ContentModal from "../components/content-modal/ContentModal";


const ListView = () => {
  const { contentType } = useParams();
  const title = contentType && `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} List`;

  const [currContentType, setCurrContentType] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)

  const openModal = (type) => {
    setCurrContentType(type);
    setModalOpened(true);
  }

  const onConfirm = newList => {
    if (newList) setList(newList);
    setModalOpened(false);
  }

  return (
    <>
      <ContentModal
        opened={modalOpened}
        contentType={currContentType}
        title={`Add ${currContentType}`}
        onClose={() => setModalOpened(false)}
        onConfirm={onConfirm}
      />
      <ListPreview title={title} contentType={contentType} openModal={openModal} full />
    </>
  )
}

export default ListView
