import React from 'react';
import FaqBereich from './Hilfebereich/Faq.js';
import ChatBot from './Hilfebereich/ChatBot.js';
const Hilfebereich = () => {
    return (
        <div className="maindiv">
            <text>Hilfebereich<br></br> </text>   
           <FaqBereich/>
           <ChatBot/>
           <br></br>
        </div>
    )
}
export default Hilfebereich