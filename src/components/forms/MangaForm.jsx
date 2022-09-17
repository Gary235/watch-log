import { useForm } from "@mantine/form";

import addContent from "../../utils/content-add";
import editContent from "../../utils/content-edit";

import { Button, Space, TextInput } from "@mantine/core";
import STORAGE_KEYS from "../../constants/storage-keys";

const MangaForm = (props) => {
  const {item, onConfirm} = props

  const form = useForm({
    initialValues: {
      title: item?.title || '',
      image: item?.image || '',
      linkToChapters: item?.linkToChapters || '',
      templateLinkToChapter: item?.templateLinkToChapter || '',
      currentChapter: item?.currentChapter || '0'
    },

    validate: {
      title: val => val.length > 0 ? null : 'Invalid',
      linkToChapters: val => val.length > 0 ? null : 'Invalid',
      templateLinkToChapter: val => val.length > 0 ? null : 'Invalid',
      currentChapter: val => !isNaN(+val) ? null : 'Not a number',
    },
  });

  const onSubmit = form.onSubmit(values => {

    const parsedCurrentChapter = values.currentChapter.replace('.', '-');
    const linkToCurrentChapter = values.templateLinkToChapter.replace('{}', parsedCurrentChapter);

    const parsedValues = {
      ...values,
      ...(item && {id: item.id}),
      linkToCurrentChapter: linkToCurrentChapter,
      lastUpdated: new Date()
    }

    if (item) editContent(parsedValues, STORAGE_KEYS.MANGA, onConfirm);
    else addContent(parsedValues, STORAGE_KEYS.MANGA, onConfirm);
  })

  return (
    <form onSubmit={onSubmit}>
      <TextInput placeholder="Ex: Martial Peak" label="Title" withAsterisk {...form.getInputProps('title')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://images.com/image.jpg" label="Image" {...form.getInputProps('image')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://content.com/martial-peak/" label="Link to chapter List" withAsterisk {...form.getInputProps('linkToChapters')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://content.com/martial-peak/chapter-{}" label="Template Link to Chapter" description="Use brackets wherever the number goes" withAsterisk {...form.getInputProps('templateLinkToChapter')} />
      <Space h="sm" />
      <TextInput label="Current Chapter" description="Use dot for decimals" {...form.getInputProps('currentChapter')} />
      <Space h="lg" />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default MangaForm
