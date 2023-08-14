import STORAGE_KEYS from "../../constants/storage-keys";

import { Modal } from "@mantine/core"

import WatchlistForm from "../forms/WatchlistForm";
import RegularForm from "../forms/RegularForm";
import ListForm from "../forms/ListForm";

const ContentModal = (props) => {
  const { onClose, onConfirm, opened, contentType, title, item } = props;

  const forms = {
    [STORAGE_KEYS.WATCH_LIST]: WatchlistForm,
    list: ListForm
  }

  const Form = forms[contentType] ?? RegularForm;

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
