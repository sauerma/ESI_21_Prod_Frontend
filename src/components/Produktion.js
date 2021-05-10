import React from 'react';
import './Style/Produktion.css';
import Typography from '@material-ui/core/Typography';
import  DataTable  from './Production/production_table.js'

const Produktion = () => {
    return (
        <div>
            <Typography paragraph>
            Produktion
            </Typography>
           <DataTable/>
        </div>
    )
}

export default Produktion