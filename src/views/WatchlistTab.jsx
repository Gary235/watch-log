import { useState } from "react";

import STORAGE_KEYS from "../constants/storage-keys";
import CONTENT_COLOR from "../constants/content-color";
import useContent from "../hooks/useContent";

import { ActionIcon, Badge, Button, Container, Table, Text } from "@mantine/core";
import { IconEdit, IconPlus, IconStar, IconTrash } from "@tabler/icons";
import ContentModal from "../components/content-modal/ContentModal";
import deleteContent from "../utils/content-delete";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";

/**
  *
    title: string;
    linkToChapters: string;
    type: string;
    rating?: number;
    numberOfChapters?: number;
 */


const WatchListTab = () => {
  const [editAddModalOpened, setEditAddModalOpened] = useState(false)
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { list, setList } = useContent(STORAGE_KEYS.WATCH_LIST)

  console.log({list})

  const onConfirmEditAdd = newList => {
    setList(newList);
    setEditAddModalOpened(false);
  }

  const onConfirmDelete = newList => {
    setList(newList);
    setDeleteModalOpened(false);
  }

  const onElementClicked = (e, element) => {
    if (!['TD', 'P', 'SPAN'].includes(e.target.tagName)) return;

    if (window.innerWidth <= 750) {
      setSelectedItem(element);
      setEditAddModalOpened(true);
    }
  }


  const rows = list?.map((element, index) => (
    <tr key={element.title} onClick={(e) => onElementClicked(e, element)} className='item-list'>
      <td className="removable">{index + 1}</td>
      <td>
        <Text
          target="_blank"
          color={element.linkToChapters ? 'blue' : 'dark'}
          component={element.linkToChapters ? 'a' : 'p'}
          variant={element.linkToChapters ? 'link' : 'text'}
          href={element?.linkToChapters || '#'}
        >
          {element.title}
        </Text>
      </td>
      <td><Badge color={CONTENT_COLOR[element.type]} transform="uppercase">{element.type}</Badge></td>
      <td className="removable"><IconStar size={16} fill='orange' stroke={0} /> {element.rating}</td>
      <td className="removable">{element.numberOfChapters}</td>
      <td style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 0' }}>
        <ActionIcon className="removable" variant="light" color="violet" onClick={() => { setSelectedItem(element); setEditAddModalOpened(true) }}><IconEdit /></ActionIcon>
        <ActionIcon variant="light" color="red" onClick={() => { setSelectedItem(element); setDeleteModalOpened(true) }}><IconTrash /></ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <ContentModal
        opened={editAddModalOpened}
        contentType={STORAGE_KEYS.WATCH_LIST}
        title="Add to List"
        onClose={() => setEditAddModalOpened(false)}
        onConfirm={onConfirmEditAdd}
        item={selectedItem}
      />
      <ConfirmationModal
        opened={deleteModalOpened}
        title={`Delete ${selectedItem?.title}?`}
        message="Are you sure that you want to delete this item?"
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={() => deleteContent(selectedItem?.id, STORAGE_KEYS.WATCH_LIST, onConfirmDelete)}
      />
      <Container size="fluid" px={35} className='fluid-container'>
        <Button rightIcon={<IconPlus size={14} />} variant="outline" color="blue" radius="md" size="xs" my={15} onClick={() => { setSelectedItem(null); setEditAddModalOpened(true) }}> Add New Item </Button>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th className="removable">#</th>
              <th>Title</th>
              <th>Type</th>
              <th className="removable">Rating</th>
              <th className="removable">Number of Chapters</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </>
  )
}

export default WatchListTab