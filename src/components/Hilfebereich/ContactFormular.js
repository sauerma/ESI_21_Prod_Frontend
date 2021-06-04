/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Kontaktformular
/*-----------------------------------------------------------------------*/

import emailjs from 'emailjs-com';
import React, { useState } from "react";
import {  Grid} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import './ContactFormular.css';
import Container from '@material-ui/core/Container';

//Set style
const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "200px",
  },
  
}
));

export default function ContactUs() {

  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const handleClose = () => {
    setSubmitted(false);
  };

  //Send mail
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_ilcwy5f', 'template_dy6ebum', e.target, 'user_Auul52m0P3CSyXYs3ByXD')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitted(true);
      e.target.reset();
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
  }
  
  return (
    
    <div>

    <Container maxWidth="lg" className={classes.container}>
      <form className="contact-form" onSubmit={sendEmail} style={{padding: "1px 23% 1px"}}>
        <Grid container spacing={2} className={classes.gridStyle}>

          <Grid item sm={12} xs={12} style={{padding: "1px 98% 0px"}} >
            <input type="hidden" name="contact_form" value="YourShirt Support - Kontaktformular"/>
            <input type="hidden" name="modul_name" value="Produktion"/>
            <input type="hidden" name="to_name" value="YourShirt Support"/>
            <label style={{color: "white"}}>Name</label>
            <input type="text" name="user_name" style={{width: "200px"}}/>
          </Grid>

          <Grid item  style={{padding: "10px 98% 0px"}} >
            <label style={{color: "white"}} >Telefonnummer</label>
            <input type="tel" name="contact_number" style={{width: "200px"}} />
          </Grid>

          <Grid item sm={5} xs={5} style={{padding: "10px 98% 0px"}} >
            <label style={{color: "white"}}>Mail</label>
            <input type="email" name="user_email" style={{width: "200px"}} />
          </Grid>

          <Grid item sm={12} xs={12} >
            <label style={{color: "white"}}>Nachricht</label>
            <textarea name="message" style={{width: "600px", height: "150px"}} />
          </Grid>

          <Grid item sm={12} xs={12} style={{padding: "10px 98% 0px"}} >
             <input type="submit" value="Nachricht versenden" style={{width: "240px", height:"50px", background: "#6689ae", color: "#FFFFFF"}}/>
          </Grid>

        </Grid>
        {submitted && <div style={{padding:"20px", fontSize:"18px", color:"#006064"}} class='success-message'>
        <Alert onClose={handleClose}> Vielen Dank! Wir bearbeiten Ihr Anliegen schnellstmöglich.</Alert>
        </div>}
      </form>
    </Container>

    </div>
  );
}