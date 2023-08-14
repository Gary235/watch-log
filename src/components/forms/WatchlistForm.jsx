import { useForm } from "@mantine/form";

import addContent from "../../utils/content-add";
import editContent from "../../utils/content-edit";

import { Button, NumberInput, Select, Space, TextInput } from "@mantine/core";
import STORAGE_KEYS from "../../constants/storage-keys";
import getContentTypes from "../../utils/get-content-types";

const WatchlistForm = (props) => {
  const { item, onConfirm } = props

  const form = useForm({
    initialValues: {
      title: item?.title || '',
      linkToChapters: item?.linkToChapters || '',
      type: item?.type || '',
      rating: item?.rating || '',
      numberOfChapters: item?.numberOfChapters || '',
    },

    validate: {
      title: val => val.length > 0 ? null : 'Invalid',
      type: val => val.length > 0 ? null : 'Invalid',
    },
  });

  const onSubmit = form.onSubmit(values => {

    const parsedValues = {
      ...values,
      ...(item && { id: item.id })
    }

    if (item) editContent(parsedValues, STORAGE_KEYS.WATCH_LIST, onConfirm);
    else addContent(parsedValues, STORAGE_KEYS.WATCH_LIST, onConfirm);
  })

  return (
    <form onSubmit={onSubmit}>
      <TextInput placeholder="Ex: Martial Peak" label="Title" withAsterisk {...form.getInputProps('title')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://content.com/martial-peak/" label="Link to Info" {...form.getInputProps('linkToChapters')} />
      <Space h="sm" />
      <Select
        label="Type of Content"
        placeholder="Ex: Anime"
        clearable
        withAsterisk
        data={
          getContentTypes()
          .filter(type => type !== STORAGE_KEYS.WATCH_LIST)
          .map(type => ({value: type, label: type.at(0).toUpperCase().concat(type.slice(1))}))
        }
        {...form.getInputProps('type')}
      />
      <Space h="sm" />
      <NumberInput min={0} max={10} label="Rating (1 - 10)" {...form.getInputProps('rating')} />
      <Space h="sm" />
      <NumberInput min={0} label="Number of Chapters" {...form.getInputProps('numberOfChapters')} />
      <Space h="sm" />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default WatchlistForm
