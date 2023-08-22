import STORAGE_KEYS from "../constants/storage-keys"

import ListPreview from "../components/list-preview/ListPreview"
import getContentTypes from "../utils/get-content-types"
import { Container, Space, Alert } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useContext, useState } from "react";
import ContentModal from "../components/content-modal/ContentModal";
import useContent from "../hooks/useContent";
import ContentContext from "../contexts/content-context";


const WatchingTab = () => {
  const [contentType, setContentType] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const content = useContext(ContentContext)

  const openModal = (type) => {
    setContentType(type);
    setModalOpened(true);
  }

  const onConfirm = (newList, type) => {
    if (newList) content.setDb({...content.db, [type]: newList})

    setModalOpened(false);
  }

  const contentTypes = getContentTypes()
    .filter(type => type !== STORAGE_KEYS.WATCH_LIST)
    .sort((a, b) => a.localeCompare(b))

  const renderPreviews = () => {
    return (
      <>
        <Container m={0} px={15} size="fluid">
          <Alert
            icon={<IconPlus size="1rem" />}
            title="Want to add a new category?"
            color="indigo"
            variant="light"
            onClick={() => openModal('list')}
            style={{cursor: 'pointer'}}
            className="add-list"
          >
            After adding a new category, a new list will appear for you to add new items!
          </Alert>
          <Space h="lg" />
        </Container>
        {contentTypes.map(type => (
          <ListPreview
            key={type}
            title={`${type} List`}
            contentType={type}
            openModal={openModal}
          />
        ))}
      </>
    )
  }

  return (
    <>
      <ContentModal
        opened={modalOpened}
        contentType={contentType}
        title={`Add ${contentType}`}
        onClose={() => setModalOpened(false)}
        onConfirm={onConfirm}
        key={`${contentType}-modal`}
      />
      <Container size="fluid" px={50} py={25} className='fluid-container'>
        {renderPreviews()}
      </Container>
    </>
  )
}

export default WatchingTab