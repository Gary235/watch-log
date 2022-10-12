import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContent from "../../hooks/useContent";

import { ActionIcon, Button, Container, Space, Title } from "@mantine/core";

import {IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons";
import ContentModal from "../content-modal/ContentModal";
import ContentList from "../content-list/ContentList";

import './styles.css'

const ListPreview = (props) => {
  const {title, contentType, full=false} = props;
  const [modalOpened, setModalOpened] = useState(false)
  const {list, setList} = useContent(contentType)
  const navigateTo = useNavigate();

  const onConfirm = newList => {
    setList(newList);
    setModalOpened(false);
  }

  const onMoreClicked = () => navigateTo(`/list/${contentType}`)
  const onBackClicked = () => navigateTo(`/`)

  const contentList = full ? list : list?.slice(0, 4)

  return (
    <>
      <ContentModal
        opened={modalOpened}
        contentType={contentType}
        title="Add to List"
        onClose={() => setModalOpened(false)}
        onConfirm={onConfirm}
      />
      <Container size="fluid" px={50} py={25} className='fluid-container'>
        <div className="title-container">
          {full && <ActionIcon color="violet" mr={15} variant="gradient" onClick={onBackClicked}><IconChevronLeft size={16} /></ActionIcon>}
          <Title order={3}>{title} ( {list?.length} )</Title>
          <Button rightIcon={<IconPlus size={14}/>} variant="subtle" color='dark' radius="md" size="xs" mr="auto" ml="sm" onClick={() => setModalOpened(true)}> add </Button>
          {!full && <Button rightIcon={<IconChevronRight size={16} />} variant="light" color="blue" radius="md" size="xs" onClick={onMoreClicked}> more </Button>}
        </div>
        <Space h="sm" />
        <div className="list-container">
          <ContentList list={contentList} contentType={contentType} full={full} />
          {/* {!full && (
            <div className="others-thumbnails">
              {list?.slice(5, 9).map(item => item.image && (
                <Image width={50} height={70} style={{objectFit: 'cover'}} radius="lg" src={item.image} />
              ))}
            </div>
          )} */}
        </div>
      </Container>
    </>
  )
}

export default ListPreview