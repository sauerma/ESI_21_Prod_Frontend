import React from 'react';
import './Style/Produktion.css';
import Typography from '@material-ui/core/Typography';
import  TabChange  from './Production/TabChange.js'

const Produktion = () => {
    return (
        <div>
            <Typography paragraph>
              Produktion
            </Typography>
           <TabChange/>
        </div>
    )
}

export default Produktion