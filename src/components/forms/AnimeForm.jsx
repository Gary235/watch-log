import { useForm } from "@mantine/form";

import addContent from "../../utils/content-add";
import editContent from "../../utils/content-edit";

import { Button, Chip, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";

const days = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
}

const AnimeForm = (props) => {
  const { item, onConfirm, contentType } = props
  const [airingDays, setAiringDays] = useState(days);

  useEffect(() => {
    const itemAiringDays = item?.airingDays || null
    if (!item?.airingDays) return;

    const editedAiringDays = { ...airingDays };
    itemAiringDays.forEach(airingDay => { editedAiringDays[airingDay] = true })

    setAiringDays(editedAiringDays)
  }, [])

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

  const setDayChecked = (day) => {
    const updatedDays = { ...airingDays, [day]: !airingDays[day] }
    setAiringDays(updatedDays)
  }

  const onSubmit = form.onSubmit(values => {

    const parsedCurrentChapter = values.currentChapter.toString().replace('.', '-');
    const linkToCurrentChapter = values.templateLinkToChapter.replace('{}', parsedCurrentChapter);
    const checkedAiringDays = Object.entries(airingDays)
      .filter(([_, checked]) => checked)
      .map(([day, _]) => day)

    const parsedValues = {
      ...values,
      ...(item && { id: item.id }),
      linkToCurrentChapter: linkToCurrentChapter,
      lastUpdated: new Date(),
      airingDays: checkedAiringDays
    }

    if (item) editContent(parsedValues, contentType, onConfirm);
    else addContent(parsedValues, contentType, onConfirm);
  })

  return (
    <form onSubmit={onSubmit}>
      <TextInput placeholder="Ex: Attack on Titan" label="Title" withAsterisk {...form.getInputProps('title')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://images.com/image.jpg" label="Image" {...form.getInputProps('image')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://content.com/attack-on-titan/" label="Link to chapter List" withAsterisk {...form.getInputProps('linkToChapters')} />
      <Space h="sm" />
      <TextInput placeholder="Ex: https://content.com/attack-on-titan/chapter-{}" label="Template Link to Chapter" description="Use brackets wherever the number goes" withAsterisk {...form.getInputProps('templateLinkToChapter')} />
      <Space h="sm" />
      <TextInput label="Current Chapter" description="Use dot for decimals" {...form.getInputProps('currentChapter')} />
      <Space h="sm" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Object.entries(airingDays).map(
          ([day, checked]) => <Chip key={day} checked={checked} onChange={() => setDayChecked(day)}> {day.slice(0, 3)} </Chip>
        )}
      </div>
      <Space h="lg" />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default AnimeForm
