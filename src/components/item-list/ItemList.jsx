import { useState } from "react";

import useContent from "../../hooks/useContent";
import deleteContent from "../../utils/content-delete";
import editContent from "../../utils/content-edit";
import getParsedTime from "../../utils/get-parsed-time";

import { ActionIcon, Button, Highlight, Image, Paper, Text, Title } from "@mantine/core";
import { IconClock, IconEdit, IconTrash } from "@tabler/icons";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";
import ContentModal from "../content-modal/ContentModal";

import './styles.css'

const ItemList = (props) => {
  const {item, contentType} = props;
  const {setList} = useContent(contentType)

  const [editModalOpened, setEditModalOpened] = useState(false)
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)

  // const lastChapterIsCurrent = item?.lastAiredChapter?.title.includes(item?.currentChapter.toString());

  // const status = lastChapterIsCurrent ? 'NO NEW CHAPTERS' : 'THERE ARE UNREAD CHAPTERS'
  // const color = lastChapterIsCurrent ? 'blue' : 'orange'

  const lastUpdatedInMili = new Date(item.lastUpdated).getTime()
  const getParsedDiff = getParsedTime(lastUpdatedInMili)

  const onConfirmEdit = newList => {
    setList(newList);
    setEditModalOpened(false);
  }

  const onConfirmDelete = newList => {
    setList(newList);
    setEditModalOpened(false);
  }

  const onChangeCurrentChapterCount = (add = True) => {
    const parsedValues = {
      ...item,
      currentChapter: add 
        ? parseInt(item.currentChapter) + 1
        : parseInt(item.currentChapter) - 1
    }

    editContent(parsedValues, contentType, onConfirmEdit);
  }

  return (
    <>
      <ContentModal
        opened={editModalOpened}
        contentType={contentType}
        title={`Edit ${item.title}`}
        item={item}
        onClose={() => setEditModalOpened(false)}
        onConfirm={onConfirmEdit}
      />
      <ConfirmationModal
        opened={deleteModalOpened}
        title={`Delete ${item.title}?`}
        message="Are you sure that you want to delete this item?"
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={() => deleteContent(item.id, contentType, onConfirmDelete)}
      />
      <Paper shadow="lg" p="lg" className="item-container">
        <Image
          width={170}
          height={120}
          style={{objectFit: 'cover'}}
          radius="sm"
          withPlaceholder
          src={item.image}
          className='image'
        />
        <div className="item-info">
          <div className="title">
            <Title
              component="a"
              href={item.linkToChapters}
              target="_blank"
              variant="link"
              color="dark"
              order={2}
              transform="capitalize"
            >
              {item.title}
            </Title>
            <Text size="xs" color="dimmed" italic className="title__lastUpdated"><IconClock size={14}/>{getParsedDiff}</Text>
            {/* <Badge color={color} className="badge">{status}</Badge> */}
          </div>
          <div className="current-chapter">
            <Button variant="subtle" onClick={() => onChangeCurrentChapterCount(false)}>-</Button>
            <Highlight
              component="a"
              href={item.linkToCurrentChapter}
              target="_blank"
              variant="link"
              color="dark"
              highlight={item.currentChapter.toString()}
              highlightStyles={(theme) => ({
                backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
                fontWeight: 700,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              })}
            >
              {`Current Chapter: ${item.currentChapter}`}
            </Highlight>
            <Button variant="subtle" onClick={onChangeCurrentChapterCount}>+</Button>
          </div>
          {/* <Text>Last Aired Chapter: {item?.lastAiredChapter?.title} </Text> */}
        </div>
        <div className="actions">
          <ActionIcon variant="light" color="violet" onClick={() => setEditModalOpened(true)}><IconEdit /></ActionIcon>
          <ActionIcon variant="light" color="red" onClick={() => setDeleteModalOpened(true)}><IconTrash /></ActionIcon>
        </div>
      </Paper>
    </>
  )
}

export default ItemList