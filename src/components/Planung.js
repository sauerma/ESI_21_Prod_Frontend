import React from 'react';
import './Style/Planung.css';
import Typography from '@material-ui/core/Typography';
import  EnhancedTable  from './Planung/order_table.js'

const Planung = () => {
    return (
        <div>
            <Typography paragraph>
            Planung
            </Typography>
            <EnhancedTable/>
        </div>
    )
}

export default Planung