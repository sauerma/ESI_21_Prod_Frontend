import React, { /*useState, useEffect*/} from "react";
import Button from '@material-ui/core/Button';
import './MatBestellTable.css';
import axios from "axios";

export default function MatBestellTable() {
  
function OrderMaterial(){

  var stk_shirt= document.getElementById('weiß');
  var stk_shirt_div = document.getElementById('shirtDivers');
  var colordiv = document.getElementById('colordiv').value;
  var liter_c = document.getElementById('C')
  var liter_m = document.getElementById('M');
  var liter_y = document.getElementById('Y');
  var liter_k = document.getElementById('K');

  console.log("You ordered: Black Shirt:", stk_shirt.checked, ", Shirt Divers: (color:", colordiv,"):", stk_shirt_div.checked, ", C:", liter_c.checked, ", M:", liter_m.checked, ", Y:", liter_y.checked, ", K:", liter_k.checked);

  var body = []

  if (stk_shirt.checked) body.push({"m_id_materialstype": "T", "quantity": 200, "RES_QTY": 2000, "hexcolor": '#FFFFFF' });  //Black Shirt 
  if (stk_shirt_div.checked) body.push({"m_id_materialstype": "T", "quantity": 20, "RES_QTY": 20, "hexcolor": colordiv });  //Divers Shirt
  if (liter_c.checked) body.push({"m_id_materialstype": "C", "quantity": 50, "RES_QTY": 50, "hexcolor": " " });  //C
  if (liter_m.checked) body.push({"m_id_materialstype": "M", "quantity": 50, "RES_QTY": 50, "hexcolor": " " });  //M
  if (liter_y.checked) body.push({"m_id_materialstype": "Y", "quantity": 50, "RES_QTY": 50, "hexcolor": " " });  //Y
  if (liter_k.checked) body.push({"m_id_materialstype": "K", "quantity": 50, "RES_QTY": 50, "hexcolor": " " });  //K

  InsertMatOrders(body);
  console.log("Body for insert:", body);

  return; 
}


function InsertMatOrders(body){

  if (body.length === 0) { alert("Bitte Anzahl eingeben!"); return; }; 

  axios.post('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/creatematerialorder', body)
  .then(res => {
  console.log("RESPONSE:", res);
  cssMessage("Erfolgreich bestellt.", "#4dff88"); 
  sleep(700).then(() => {
    window.location.reload();    
  }); 

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
      cssMessage("Error.", "#9c2c2c");
  })
}

function cssMessage(message, color)
{ 
  //Set
  document.getElementsByClassName("footer")[0].style.textAlign = "center";
  document.getElementsByClassName("footer")[0].innerHTML = message;
  document.getElementsByClassName("footer")[0].style.backgroundColor = color;

  //Reset
  sleep(2200).then(() => { 
  document.getElementsByClassName("footer")[0].style.textAlign = "right";
  document.getElementsByClassName("footer")[0].innerHTML = "Powered by ©BlackForestConsulting";
  document.getElementsByClassName("footer")[0].style.backgroundColor = "#90caf9";
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  return (
  <div >
    <table id="orderMat" className="matTable">
      <tr  className="header">
        <th colspan="1">T-Shirt</th>
        <th colspan="2">T-Shirt divers</th>
        <th colspan="3">C-Farbe</th>
        <th colspan="4">M-Farbe</th>
        <th colspan="5">Y-Farbe</th>
        <th colspan="6">K-Farbe</th>
      </tr>
      <tr>
        <td colspan="1" >#FFFFFF</td>
        <td colspan="2">
        &nbsp;
          <select name="colordivers" id="colordiv">
            <option  value="#322e38" style={{backgroundColor:"#322e38", color: "white"}}>Nachtschwarz</option>
            <option  value="#6b1c23" style={{backgroundColor:"#6b1c23", color: "white"}}>Purpurrot</option>
            <option  value="#4db560" style={{backgroundColor:"#4db560", color: "white"}}>Giftgrün</option>
            <option  value="#35682d" style={{backgroundColor:"#35682d", color: "white"}}>Grasgrün</option>
            <option  value="#0088ff" style={{backgroundColor:"#0088ff", color: "white"}}>Himmelblau</option>
            <option  value="#e0b0ff" style={{backgroundColor:"#e0b0ff", color: "white"}}>Malve</option>
            <option  value="#005f6a" style={{backgroundColor:"#005f6a", color: "white"}}>Petrol</option>
            <option  value="#f39f18" style={{backgroundColor:"#f39f18", color: "white"}}>Sonnengelb</option>
            <option  value="#00286e" style={{backgroundColor:"#00286e", color: "white"}}>HSOG-blau</option>
          </select>
          &nbsp;
        </td>
        <td colspan="3" className="color1"> </td>
        <td colspan="4" className="color2"> </td>
        <td colspan="5" className="color3"> </td>
        <td colspan="6" className="color4"> </td>
      </tr>
      <tr >
        <td colspan="1"> <input type="checkbox" id="weiß" /> <label for="weiß">200 Stück &nbsp;</label></td>
        <td colspan="2"> <input type="checkbox" id="shirtDivers" /> <label for="shirtDivers">20 Stück &nbsp;</label></td>
        <td colspan="3"> <input type="checkbox" id="C" /> <label for="C">50 Liter &nbsp;</label></td>
        <td colspan="4"> <input type="checkbox" id="M" /> <label for="M">50 Liter &nbsp;</label></td>
        <td colspan="5"> <input type="checkbox" id="Y" /> <label for="Y">50 Liter &nbsp;</label></td>
        <td colspan="6"> <input type="checkbox" id="K" /> <label for="K">50 Liter &nbsp;</label></td>
      </tr>
  </table>

  <br></br>

  <Button 
    variant="contained" 
    style={{float: "left"}}
    onClick={OrderMaterial} 
    title="Mit Klick auf diesen Button werden die entsprechenden T-Shirts oder Farben bestellt." >
    Bestellen
  </Button>

</div>

  );
}