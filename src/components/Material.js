import './Style/Material.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import MatBestellTable from './Material/MatBestellTable.js';
import InOrderTable from './Material/InOrderTable.js';

import ShirtsUndColorsTable from './Material/ShirtsUndColorsTable.js';

  const Material = () => {

    return (
     
        <div >
           <Typography paragraph>
            Materialmanagement
           </Typography>

           <MatBestellTable />
           <br></br>
           <InOrderTable />
           <br></br>
           <ShirtsUndColorsTable />
  
     </div>
    )
}

export default Material