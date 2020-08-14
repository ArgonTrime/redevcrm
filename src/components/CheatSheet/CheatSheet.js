import React from 'react';
import {Tabs} from 'antd';
import CheatSheetSection from '../CheatSheetSection/CheatSheetSection';
import CheatSheetThemes from '../CheatSheetThemes/CheatSheetThemes';

const {TabPane} = Tabs;

class CheatSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 'small'
        }
    }

    render() {
        const {size} = this.state;

        return (

        <Tabs 
            defaultActiveKey='1' 
            type='card' 
            size={size}
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
}

export default CheatSheet;