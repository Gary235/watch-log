import { Alert, Modal, Space, Text } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons";
import ImportDataForm from "../forms/ImportDataForm";

const ImportDataModal = (props) => {
  const { onClose, onConfirm, opened } = props;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Import JSON File"
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
    >
      <Alert icon={<IconAlertCircle size={16} />} title="Wait a minute!" color="yellow">
        If you import a new file, all existing data will be replaced.
      </Alert>

      <Space h="sm" />
      <ImportDataForm onConfirm={onConfirm} />
    </Modal>
  )
}

export default ImportDataModal
