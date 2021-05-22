import React, { /*useState, useEffect*/} from "react";
import Button from '@material-ui/core/Button';
import './MatBestellTable.css';

export default function MatBestellTable() {
  

  return (
    <div >
  <table className="matTable">

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
             <select name="coloordivers" id="colordiv">
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
        <td colspan="1"><input type="text" id="tshirt" name="tshirt"/>Stk</td>
            <td colspan="2"><input type="text" id="tshirtdiv" name="tshirtdiv"/>Stk</td>
            <td colspan="3"><input type="text" id="c" name="c"/>Liter</td>
            <td colspan="4"><input type="text" id="m" name="m"/>Liter</td>
            <td colspan="5"><input type="text" id="y" name="y"/>Liter</td>
            <td colspan="6"><input type="text" id="k" name="k"/>Liter</td>
        </tr>
</table>
<br></br>
<Button variant="contained" stitle="Mit Klick auf diesen Button
    werden die entsprechenden T-Shirts oder Farben bestellt.">Bestellen</Button>
</div>

  );
}