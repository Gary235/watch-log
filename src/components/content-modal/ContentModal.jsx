import STORAGE_KEYS from "../../constants/storage-keys";

import { Modal } from "@mantine/core"
import MangaForm from "../forms/MangaForm";
import AnimeForm from "../forms/AnimeForm";
import WatchlistForm from "../forms/WatchlistForm";

const ContentModal = (props) => {
  const { onClose, onConfirm, opened, contentType, title, item } = props;

  let Form = null;
  switch (contentType) {
    case STORAGE_KEYS.ANIME:
      Form = AnimeForm;
      break;
    case STORAGE_KEYS.WATCH_LIST:
      Form = WatchlistForm;
      break
    case STORAGE_KEYS.MANGA:
    default:
      Form = MangaForm
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
    >
      <Form item={item} onConfirm={onConfirm} contentType={contentType} />
    </Modal>
  )
}

export default ContentModal
