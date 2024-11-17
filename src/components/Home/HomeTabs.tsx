'use server';

import { MyClubs } from './MyClubs';
import { MyMessages } from './MyMessages';
import { HomeTabsClient } from './HomeTabsClient';

const tabs = [
  {
    label: 'My clubs',
    component: <MyClubs></MyClubs>
  },
  {
    label: 'My messages',
    component: <MyMessages></MyMessages>
  },
  {
    label: 'My books',
    component: <MyClubs></MyClubs>
  },
  {
    label: 'My friends',
    component: <MyClubs></MyClubs>
  }
]

export async function HomeTabs() {
  return <HomeTabsClient tabs={ tabs }></HomeTabsClient>
}
