import React, { /*useState, useEffect*/} from "react";
import Button from '@material-ui/core/Button';
import './MatBestellTable.css';
import axios from "axios";

export default function MatBestellTable() {
  
function OrderMaterial(){

  var stk_shirt = document.getElementById('tshirt').value;
  var stk_shirt_div = document.getElementById('tshirtdiv').value;
  var colordiv = document.getElementById('colordiv').value;
  var liter_c = document.getElementById('c').value;
  var liter_m = document.getElementById('m').value;
  var liter_y = document.getElementById('y').value;
  var liter_k = document.getElementById('k').value;

  console.log("You ordered: Black Shirt:", stk_shirt, ", Shirt Divers: (color:", colordiv,"):", stk_shirt_div, ", C:", liter_c, ", M:", liter_m, ", Y:", liter_y, ", K:", liter_k);

  var body = []

  if (stk_shirt !== undefined && stk_shirt !== 0 && stk_shirt !== "") body.push({"m_id_materialstype": "T", "quantity": stk_shirt, "RES_QTY": stk_shirt, "hexcolor": '#FFFFFF' });  //Black Shirt 
  if (stk_shirt_div !== undefined && stk_shirt_div !== 0 && stk_shirt_div !== "") body.push({"m_id_materialstype": "T", "quantity": stk_shirt_div, "RES_QTY": stk_shirt_div, "hexcolor": colordiv });  //Divers Shirt
  if (liter_c !== undefined && liter_c !== 0 && liter_c !== "") body.push({"m_id_materialstype": "C", "quantity": liter_c, "RES_QTY": liter_c, "hexcolor": " " });  //C
  if (liter_m !== undefined && liter_m !== 0 && liter_m !== "") body.push({"m_id_materialstype": "M", "quantity": liter_m, "RES_QTY": liter_m, "hexcolor": " " });  //M
  if (liter_y !== undefined && liter_y !== 0 && liter_y !== "") body.push({"m_id_materialstype": "Y", "quantity": liter_y, "RES_QTY": liter_y, "hexcolor": " " });  //Y
  if (liter_k !== undefined && liter_k !== 0 && liter_k !== "") body.push({"m_id_materialstype": "K", "quantity": liter_k, "RES_QTY": liter_k, "hexcolor": " " });  //K

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
            </td>
            <td colspan="3" className="color1"> </td>
            <td colspan="4" className="color2"> </td>
            <td colspan="5" className="color3"> </td>
            <td colspan="6" className="color4"> </td>
        </tr>
        <tr >
        <td colspan="1"><input type="number" id="tshirt" name="tshirt" />  Stück&nbsp;</td>
            <td colspan="2"><input type="number" id="tshirtdiv" name="tshirtdiv" /> Stück&nbsp;</td>
            <td colspan="3"><input type="number" id="c" name="c"/>  Liter&nbsp;</td>
            <td colspan="4"><input type="number" id="m" name="m"/>  Liter&nbsp;</td>
            <td colspan="5"><input type="number" id="y" name="y"/>  Liter&nbsp;</td>
            <td colspan="6"><input type="number" id="k" name="k"/>  Liter&nbsp;</td>
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