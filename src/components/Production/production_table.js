/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function DataTable() {

  const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
  {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
  {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
  {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
  {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
  {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
  {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
  {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
  {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
  {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
  {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
  {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
  {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
  {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}},
  {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
  {name: "END_DATE",label: "END_DATE",options: {filter: true,sort: false, display: false}},
  {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}}];

  const options = { customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox',  
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [allData, setAllData] = useState([]); 
  const [/*selectedData*/, setSelectedData] =  useState([]); 

  useEffect(() => {
        
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getprodorders')
        .then(res => {
        
        console.log("RESPONSE:", res); //Data from Gateway

        if(IsDataBaseOffline(res)) return; //Check if db is available

        if(res.data.body.length === 0) { //Check if data is available
          setAllData(undefined);
          return;
        }          

        if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
        setAllData(res.data.body); //Set new data
  
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
        })
  });

  //Check if database is offline (AWS)
  function IsDataBaseOffline(res){

    if(res.data.errorMessage == null) return false; 
    if(res.data.errorMessage === 'undefined') return false;
    if(res.data.errorMessage.endsWith("timed out after 3.00 seconds")){
        alert("Database is offline (AWS).");
        return true;
    }     
    return false;
  }

  //Check if old data = new data
  function DataAreEqual(data, sortedOrders){

    if(data.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
    }

 /*  //Status-Nr to Status-Bez
  function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  }
 */

//RowSelectEvent
function rowSelectEvent(curRowSelected, allRowsSelected){ 

  var _selectedData = [];

if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
    setSelectedData(undefined);
    return;
  }
  
  allRowsSelected.forEach(element => {
    _selectedData.push(allData[element.dataIndex])
  });

  setSelectedData(_selectedData);

  return;
}


  function Abschliesen(){

    
    return;
  }

    return (
<dev>
  <MUIDataTable
    title={"Produktionsaufträge"}
    data={allData}
    columns={columns}
    options={options} />
    <br></br>
    <Button
    variant="contained" 
    onClick={Abschliesen}
    title="Mit Klick auf diesen Button
    werden alle markierten Produktionsaufträge
    als produziert markiert." >
    Produziert
    </Button>
    <text>   </text>
    
</dev>
    );
}