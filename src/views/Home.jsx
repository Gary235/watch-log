import { Image, Title } from '@mantine/core';
import { IconClipboardList, IconDeviceTv } from '@tabler/icons';
import { Outlet } from 'react-router-dom'
import Settings from '../components/settings/Settings';

import wordLogo from '../assets/word-logo.png'
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
  const tabs = [
    { label: 'Watching', value: '/', icon: (<IconDeviceTv size={14} />) },
    { label: 'Watch List', value: '/watch-list', icon: (<IconClipboardList size={14} />) },
  ]

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '15px' }} className='fluid-container'>
        <Image className='word-logo' pl={35} width={205} height={60} src={wordLogo} alt='watchlog' title='WatchLog' />
        <Settings />
      </div>
      <Tabs tabs={tabs} />
      <Outlet />
    </>
  )
}

export default Home
