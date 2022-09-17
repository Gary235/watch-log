import { useState } from "react";

import { Button, FileInput, Space } from "@mantine/core";
import importData from "../../utils/data-import";

const ImportDataForm = (props) => {
  const {onConfirm} = props
  const [value, setValue] = useState(null);

  const onSubmit = e => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = async (e) => { 
      const text = (e.target.result);
      importData(text);
    };
    reader.readAsText(value)

    onConfirm();
  }

  return (
    <form onSubmit={onSubmit}>
      <FileInput placeholder="Pick file" label="Your JSON file" value={value} onChange={setValue} />
      <Space h="sm" />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default ImportDataForm
