import { useNavigate } from "react-router-dom";
import useContent from "../../hooks/useContent";

import airsToday from "../../utils/airs-today";

import { ActionIcon, Button, Container, Space, Title, Alert } from "@mantine/core";

import { IconAlertCircle, IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons";
import ContentList from "../content-list/ContentList";

import './styles.css'

const ListPreview = ({title, contentType, full = false, openModal}) => {
  const { list } = useContent(contentType)
  const navigateTo = useNavigate();

  const onMoreClicked = () => navigateTo(`/list/${contentType}`)
  const onBackClicked = () => navigateTo(`/por-donde-voy/watching`)

  const contentList = full ? list : list?.slice(0, 4)
  const newItemsLength = list?.filter(item => airsToday(item?.airingDays)).length || 0

  return (
    <Container key={`${contentType}-list`} mb={60} size="fluid" {...(full ? {px: 50, py: 25} : {})} className={full ? "full-list-container" : ''}>
      <div className="title-container">
        {full && (
          <ActionIcon
            color="violet"
            mr={15}
            variant="gradient"
            onClick={onBackClicked}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>
        )}
        <Title
          order={3}
          style={{textTransform: 'capitalize'}}
        >
          {title} ( {list?.length ?? 0} )
        </Title>
        <Button
          rightIcon={<IconPlus size={14} />}
          variant="subtle"
          color='dark'
          radius="md"
          size="xs"
          mr="auto"
          ml="sm"
          onClick={() => openModal(contentType)}
          >
          add
        </Button>
        {!full && (
          <Button
            rightIcon={<IconChevronRight size={16} />}
            variant="light"
            color="blue"
            radius="md"
            size="xs"
            onClick={onMoreClicked}
          >
            more
          </Button>
        )}
      </div>
      <Space h="sm" />
      {newItemsLength > 0 && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title={`${newItemsLength} NEW EPISODES AIRING TODAY`}
          color="red"
        />
      )}
      <div className="list-container">
        <ContentList list={contentList} contentType={contentType} full={full} />
      </div>
    </Container>
  )
}

export default ListPreview