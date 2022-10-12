import { Button, Modal, Space, Text } from "@mantine/core"

const ConfirmationModal = (props) => {
  const { onConfirm, onClose, message, title, opened } = props

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
    >
      <Text>{message}</Text>
      <Space h="lg" />
      <Button variant="filled" color="red" radius="sm" onClick={onConfirm}>Yeah, do it!</Button>
    </Modal>
  )
}

export default ConfirmationModal