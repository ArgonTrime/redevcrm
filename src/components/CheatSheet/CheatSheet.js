import React from 'react';
import { Tabs } from 'antd';
import CheatSheetSection from '../CheatSheetSection/CheatSheetSection';
import CheatSheetThemes from '../CheatSheetThemes/CheatSheetThemes';

const {TabPane} = Tabs;

const CheatSheet = () => {
  return (
    <Tabs 
      defaultActiveKey='1' 
      type='card' 
      size='small'
      style={{
          margin: '16px'
      }}
    >
      <TabPane tab='Cheat sheet' key='1'>
        <CheatSheetSection/>
      </TabPane>

      <TabPane tab='Themes of cheat sheet' key='2'>
        <CheatSheetThemes/>
      </TabPane>
    </Tabs>
  )
}

export default CheatSheet;