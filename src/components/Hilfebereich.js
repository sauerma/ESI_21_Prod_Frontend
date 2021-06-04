/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Hilfebereich - Layout
/*-----------------------------------------------------------------------*/

import React from 'react';
import FaqBereich from './Hilfebereich/Faq.js';
import ChatBot from './Hilfebereich/ChatBot.js';
import ContactUs from './Hilfebereich/ContactFormular';
import './Style/Hilfebereich.css';
import Typography from '@material-ui/core/Typography';

const Hilfebereich = () => {
    return (
        <div>
          <Typography paragraph>
            Hilfebereich
          </Typography>
          <FaqBereich/> 
          <ContactUs />
          <ChatBot/>
          <br></br>
        </div>
    )
}
export default Hilfebereich