import { useForm } from "@mantine/form";

import addContent from "../../utils/content-add";
import editContent from "../../utils/content-edit";

import { Button, Chip, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import addContentType from "../../utils/content-type-add";

const days = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
}

const ListForm = (props) => {
  const { item, onConfirm } = props

  const form = useForm({
    initialValues: {
      title: item?.title || '',
    },

    validate: {
      title: val => val.length > 0 ? null : 'Invalid',
    },
  });

  const onSubmit = form.onSubmit(values => {
    addContentType(values?.title, onConfirm);
  })

  return (
    <form onSubmit={onSubmit}>
      <TextInput placeholder="Ex: Movies" label="Title" withAsterisk {...form.getInputProps('title')} />
      <Space h="lg" />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default ListForm
