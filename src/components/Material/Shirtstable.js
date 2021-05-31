import React, { useState, useEffect, forwardRef } from "react";
//import QualityCell from '../Planung/qualityCell.js';
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

export default function CellEditable() {

useEffect(() => { ShirtDatenLaden();});
  

/*-----------------------------------------Section SHIRTS TABLE-----------------------------------------------------*/    

const [ShirtData, setShirtData] = useState([]);

const [columnsShirts, /*setColumnsShirts*/] = useState([
  { title: 'Material-Nr', field: 'prodmat_id', editable: 'never' },
 // { title: 'Typ', field: 'm_id_materialstype', editable: 'never' },
  { title: 'Menge', field: 'quantity', editable: 'never' },
  { title: 'Restmenge', field: 'RES_QTY', editable: 'onUpdate' },
  { title: 'PPML', field: 'ppml', editable: 'never' },
  { title: 'Weißgrad', field: 'whitness', editable: 'never' },
  { title: 'Viskosität', field: 'viscosity', editable: 'never' },
  { title: 'Saugfähigkeit', field: 'absorbency', editable: 'never' },
  { title: 'Hex-Wert', field: 'hexcolor', editable: 'never' },
  { title: 'Farbe', field: 'hexcolor', editable: 'never' },
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


/* const columnsShirts = 
  [ 
    {name: "prodmat_id", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
    {name: "m_id_materialstype", label: "Typ", options: {filter: false, sort: false, display: false}},
    {name: "quantity", label: "Menge",  options: {filter: true,  sort: true, display: true}}, 
    {name: "ppml", label: "PPML", options: {filter: true, sort: true, display: true}},
    {name: "whitness", label: "Weißgrad", options: {filter: true,  sort: true,  display: true}}, 
    {name: "viscosity", label: "Viskosität", options: {filter: true, sort: true, display: true}},  
    {name: "absorbency", label: "Saugfähigkeit", options: {filter: true,  sort: true,  display: true}}, 
    {name: "RES_QTY", label: "Restmenge", options: {filter: true, sort: true, display: true}}, 
    {name: "hexcolor", label: "HEX-Wert", options: {filter: true, sort: true, display: true}}, 
    {name: "hexcolor", label: "Farbe", options: {filter: true,sort: true, display: true,
     customBodyRender: (value, tableMeta, updateValue) => {
     return (
       <QualityCell
         value={value}
         index={tableMeta.columnIndex}
         change={event => updateValue(event)}
       />
     );} }}, 
    {name: "delta_e", label: "Delta_e", options: {filter: true,sort: true, display: true}}
  ];
const optionsShirts = {rowsPerPage: 3, customToolbarSelect: () => { Hide Delete Button }, filterType: 'checkbox' }; */


function ShirtDatenLaden(){

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getmaterialshirts')
  .then(res => {
  console.log("RESPONSE:", res); //Data from Gateway
  
  if(IsDataBaseOffline(res)) return; //Check if db is available

  if(res.data.body.length === 0) { //Check if data is available
    setShirtData(undefined);
    return;
  }

  if (DataAreEqual(ShirtData, res.data.body)) return; //Check if data has changed       
  setShirtData(res.data.body); //Set new table data

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
  })
}

/*-----------------------------------------END Section SHIRTS TABLE-----------------------------------------------------*/   

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

function UpdateResMenge(oldValue, newValue, rowData){

    if(oldValue === newValue) return;
    if(oldValue - newValue < 0) { alert("Keine negativen Restmengen möglich!");  return; }
   
    axios.put(' https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateresmenge', [{"prodmat_id": 2, "RES_QTY": rowData["prodmat_id"]}])
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway

     //aktualisieren
     //Footer färben
        return;
    })

    .catch(err => {
        console.log(err.message); //Error-Handling
        //footer färben
    })

    return;
}

  return (
<div style={{ padding: '0px'}}>
<MaterialTable
      title="Shirts"
      icons={tableIcons}
      columns={columnsShirts}
      data={ShirtData}
      cellEditable={{
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
        return new Promise((resolve, reject) => { UpdateResMenge(oldValue, newValue, rowData); setTimeout(resolve, 1000); });
        }
      }}
    />
   <br></br>
</div>

  );
}