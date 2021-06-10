/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Farben-Tabelle
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function ColorsTable() {

//Event if data changed  
useEffect(() => { ColorDatenLaden(); });
  
const [ColorData , setColorData] = useState([]); 

const [columnsColors, /* setColumnsColors */] = useState([
    { title: 'Mat-Bestellnr.', field: 'prodmat_id', editable: 'never' },
    { title: 'Charge', field: 'chargen_nr', editable: 'never' },
    { title: 'Menge', field: 'quantity', editable: 'never' },
    { title: 'Restmenge', field: 'RES_QTY', editable: 'onUpdate', cellStyle: {border: "5px, #000000", fontWeight: "bold", fontStyle: "italic", backgroundColor: "#e3e3e3"} },
    { title: 'PPML', field: 'ppml', editable: 'never' },
    { title: 'Viskosität', field: 'viscosity', editable: 'never' },
    { title: 'Delta_e', field: 'delta_e', editable: 'never' },
  ]);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

//Load data  
function ColorDatenLaden(){

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getmaterialcolors')
  .then(res => {
  console.log("RESPONSE:", res); //Data from Gateway
  
  if(IsDataBaseOffline(res)) return; //Check if database is available

  if(res.data.body.length === 0) { //Check if data is available
    setColorData(undefined);
    return;
  }

  if (DataAreEqual(ColorData, res.data.body)) return; //Check if data has changed       
  setColorData(res.data.body); //Set new table data

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
  })
}

function cssMessage(message, color)
{ //Set success and error messages
  document.getElementsByClassName("footer")[0].style.textAlign = "center";
  document.getElementsByClassName("footer")[0].innerHTML = message;
  document.getElementsByClassName("footer")[0].style.backgroundColor = color;

  //Reset data
  sleep(2200).then(() => { 
  document.getElementsByClassName("footer")[0].style.textAlign = "right";
  document.getElementsByClassName("footer")[0].innerHTML = "Powered by ©BlackForestConsulting";
  document.getElementsByClassName("footer")[0].style.backgroundColor = "#90caf9";
  });
}

//Set sleep for asynchronous calls
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

function UpdateResDB(oldValue, newValue, rowData){

  //Update database with new Restmengen
  axios.put(' https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateresmenge', [{"prodmat_id": rowData["prodmat_id"], "RES_QTY": newValue}])
  .then(res => {
  console.log("RESPONSE:", res); //Data from Gateway

  cssMessage("Erfolgreich Restmenge geupdated.", "#4dff88"); //Footer färben
 
  ColorData.forEach(element => {    
      if(element["prodmat_id"] === rowData["prodmat_id"])  element["RES_QTY"] = newValue; //Update Restmengen
  });

  setColorData(undefined);
  setColorData(ColorData); //Set data

  })

  .catch(err => {
      console.log(err.message); //Error-Handling
      cssMessage("Error.", "#9c2c2c"); //footer färben
  })
}

//Update Restmengen
function UpdateResMenge(oldValue, newValue, rowData){

    if(oldValue === newValue) return;
    if(parseInt(newValue) < 0) { alert("Keine negativen Restmengen möglich!");  return; }
    if(oldValue - newValue < 0) { alert("Keine höheren Mengen möglich!");  return; }
    
    if(newValue == 0 ) {
      if(window.confirm('Sie haben die Restmenge auf 0 gesetzt. Sind Sie sicher?'))
      {  
        UpdateResDB(oldValue, newValue, rowData);
      }
      else return;  
      } 
    else 
    {
       UpdateResDB(oldValue, newValue, rowData);
    }
  

    return;
}

  return (
<div style={{ padding: '0px'}}>
  <MaterialTable
        title="Farben"
        icons={tableIcons}
        columns={columnsColors}
        data={ColorData}
        cellEditable={{ onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) =>  { UpdateResMenge(oldValue, newValue, rowData); setTimeout(resolve, 1000); }); }}} />
  <br></br>
</div>

  );
}