import { useLocation, useNavigate } from 'react-router-dom';

import { Tabs as CoreTabs } from '@mantine/core';


const Tabs = (props) => {
  const { tabs } = props;
  const navigateTo = useNavigate();
  const currLocation = useLocation();

  const currTab = currLocation.pathname

  const onTabChange = value => {
    if (currTab === value) return;
    navigateTo(value)
  }

  return (
    <CoreTabs
      variant="outline"
      radius="xs"
      defaultValue={tabs[0].value}
      value={currTab}
      px={35} pt={30} pb={15}
      onTabChange={onTabChange}
      className="fluid-container"
    >
      <CoreTabs.List>
        {tabs.map(
          ({ value, label, icon }) => <CoreTabs.Tab key={value} value={value} icon={icon}>{label}</CoreTabs.Tab>
        )}
      </CoreTabs.List>
    </CoreTabs>
  )
}

export default Tabs
