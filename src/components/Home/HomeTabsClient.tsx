'use client';

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CustomTabPanel({ children, value, index }: { children: React.ReactNode, value: number, index: number }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function HomeTabsClient({
  tabs
}: {
  tabs: { label: string, component: React.ReactNode }[]
}) {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const handleChange = (_: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }
  
  return <Box p={5} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
        {
          tabs.map((tab, index) => {
            return <Tab key={index} label={tab.label} />
          })
        }
      </Tabs>
    </Box>
    {
      tabs.map((tab, index) => {
        return <CustomTabPanel key={index} value={tabIndex} index={index}>
          {
            tab.component
          }
        </CustomTabPanel>
      })
    }
  </Box>
}
