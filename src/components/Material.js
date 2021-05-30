import './Style/Material.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import TabChangeMat from './Material/TabChangeMat.js';

  const Material = () => {

    return (
     
        <div >
           <Typography paragraph>
            Materialmanagement
           </Typography>

           <TabChangeMat/>
  
     </div>
    )
}

export default Material