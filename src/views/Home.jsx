import { MantineProvider, Title } from '@mantine/core';
import { IconClipboardList, IconDeviceTv } from '@tabler/icons';
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Settings from '../components/settings/Settings';

import Tabs from '../components/tabs/Tabs';


/**
  content: {
    id: string,
    title: string;
    image: string;
    linkToChapterList: string;
    linkToCurrentChapter: string;
    templateLinkToChapte: string;
    currentChapter: number;
    lastUpdated: stringdate;

    curr...
    airingDays: string[];

    prox...
    lastAiredChapter: {
      title: string;
      selector: string;
    };
  };
*/


const Home = () => {
  const currLocation = useLocation();
  const navigateTo = useNavigate();

  useEffect(
    () => { if (currLocation.pathname === '/por-donde-voy/') navigateTo('/por-donde-voy/watching') }
  )

  const tabs = [
    { label: 'Watching', value: 'por-donde-voy/watching', icon: (<IconDeviceTv size={14} />) },
    { label: 'Watch List', value: 'por-donde-voy/watch-list', icon: (<IconClipboardList size={14} />) },
  ]

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '15px' }} className='fluid-container'>
        <Title pl={35} className='fluid-container app-title'>Por donde voy?</Title>
        <Settings />
      </div>
      <Tabs tabs={tabs} />
      <Outlet />
    </>
  )
}

export default Home
