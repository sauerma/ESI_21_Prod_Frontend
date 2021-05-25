import React, { /*useState, useEffect*/} from "react";
import Button from '@material-ui/core/Button';
import './MatBestellTable.css';

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


  //sleep(900).then(() => { window.location.reload(); }); 

}

/* function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} */

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
              <option value="1">#55343</option>
              <option value="2">#zr4tz</option>
              <option value="3">#23343</option>
              <option value="4">#2344</option>
             </select>
            </td>
            <td colspan="3" className="color1"> </td>
            <td colspan="4" className="color2"> </td>
            <td colspan="5" className="color3"> </td>
            <td colspan="6" className="color4"> </td>
        </tr>
        <tr >
        <td colspan="1"><input type="number" id="tshirt" name="tshirt" />Stk</td>
            <td colspan="2"><input type="number" id="tshirtdiv" name="tshirtdiv" />Stk</td>
            <td colspan="3"><input type="number" id="c" name="c"/>Liter</td>
            <td colspan="4"><input type="number" id="m" name="m"/>Liter</td>
            <td colspan="5"><input type="number" id="y" name="y"/>Liter</td>
            <td colspan="6"><input type="number" id="k" name="k"/>Liter</td>
        </tr>
</table>
<br></br>
<Button variant="contained" onClick={OrderMaterial} title="Mit Klick auf diesen Button werden die entsprechenden T-Shirts oder Farben bestellt." >Bestellen</Button>
</div>

  );
}