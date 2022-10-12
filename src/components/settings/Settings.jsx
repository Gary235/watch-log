import { useState } from "react"

import exportData from "../../utils/data-export"
import deleteData from "../../utils/data-delete"

import { ActionIcon, Menu } from "@mantine/core"
import { IconFileImport, IconFileExport, IconTrash, IconAdjustments } from "@tabler/icons"
import ImportDataModal from "../import-data-modal/ImportDataModal"
import ConfirmationModal from "../confirmation-modal/ConfirmationModal"

const Settings = () => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [importModalOpened, setImportModalOpened] = useState(false)

  return (
    <>
      <ImportDataModal
        opened={importModalOpened}
        onClose={() => setImportModalOpened(false)}
        onConfirm={() => setImportModalOpened(false)}
      />
      <ConfirmationModal
        opened={deleteModalOpened}
        title={`Delete data?`}
        message="Are you sure that you want to delete ALL stored data?"
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={() => { deleteData(); setDeleteModalOpened(false) }}
      />
      <Menu shadow="md" width={200} transition='fade' position="right-start" offset={10}>
        <Menu.Target>
          <ActionIcon variant="outline" color='blue'><IconAdjustments size={16} /></ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconFileExport size={14} />} onClick={() => setImportModalOpened(true)}>Import data</Menu.Item>
          <Menu.Item icon={<IconFileImport size={14} />} onClick={exportData}>Export data</Menu.Item>

          <Menu.Divider />

          <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => setDeleteModalOpened(true)}>Delete data</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )

}

export default Settings