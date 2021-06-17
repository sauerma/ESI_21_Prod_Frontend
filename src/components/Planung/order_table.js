/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Planung-Tabelle
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {CSVLink} from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import QualityCell from './qualityCell.js';
import './order_table.css';

export default function DataTable() {

  //Set table data
  const [filterData, setFilterData] =  useState([]); 
  const [/*filterDataPoCode */, setFilterDataPoCode] =  useState([]); 

  const columns = [
    {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: true,  display: false}}, //filterList: filterDataPoCode, 
   {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
   {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}},
   {name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
   {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true}},
   {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: false, sort: true, display: false}},  
   {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
   {name: "MAT_NR", label: "Material-Nr", options: {filter: false, sort: true, display: false}}, 
   {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
   {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
   {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
   {name: "K", label: "K", options: {filter: true,sort: false, display: false}},   
   {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}},
   {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true, filterList: filterData, sort: true, display: true}},
   {name: "HEXCOLOR", label: "Farbe", options: {filter: true,sort: true, display: true,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }},
   {name: "DELTA_E", label: "Helligkeit", options: {filter: true,sort: true, display: true}},
   {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
   {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
   {name: "PROD_STATUS", label: "Status", options: {filter: false, sort: true, display: true}}, 
   {name: "END_DATE",label: "END_DATE",options: {filter: false,sort: false, display: false}}];

  const options = { rowsPerPage: 5, customToolbarSelect: () => { return <Button disabled variant="Quantity" style={{color: QuantityColor}} >Ausgewählte Menge: {Quantity} / 350</Button>}, filterType: 'checkbox', download: false, 
   onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }, customToolbar: () => { 
    return    <select onChange={e => AuswahlChange(e.target.value)}  name="colordivers" id="colordiv" style={{ float: "left", backgroundColor: auswahlBackgroundColor}} >
    <option  value="Alle" style={{backgroundColor:"#d8dce4"}}>Alle</option>
    <option  value="#fffafa" style={{backgroundColor:"#fffafa"}}>Schneeweiß</option>
    <option  value="#322e38" style={{backgroundColor:"#322e38", color: "white"}}>Nachtschwarz</option>
    <option  value="#6b1c23" style={{backgroundColor:"#6b1c23", color: "white"}}>Purpurrot</option>
    <option  value="#4db560" style={{backgroundColor:"#4db560", color: "white"}}>Giftgrün</option>
    <option  value="#35682d" style={{backgroundColor:"#35682d", color: "white"}}>Grasgrün</option>
    <option  value="#0088ff" style={{backgroundColor:"#0088ff", color: "white"}}>Himmelblau</option>
    <option  value="#e0b0ff" style={{backgroundColor:"#e0b0ff", color: "white"}}>Malve</option>
    <option  value="#005f6a" style={{backgroundColor:"#005f6a", color: "white"}}>Petrol</option>
    <option  value="#f39f18" style={{backgroundColor:"#f39f18", color: "white"}}>Sonnengelb</option>
    <option  value="#00286e" style={{backgroundColor:"#00286e", color: "white"}}>HSOG-blau</option>
   </select>;
     
  }, onFilterDialogOpen:  () => {filterOpen();}};
  const [auswahlBackgroundColor, SetAuswahlBackgroundColor] = useState("#d8dce4");            
  const [csvdata, setCsvData] = useState([]); 
  const [Quantity, setQuantity] = useState("");
  const [QuantityColor, setQuantityColor] = useState("#ffffff");
  const csvheaders = ["OI_NR", "O_DATE", "p_nr", "QUANTITY", "HEXCOLOR","DELTA_E", "C", "M", "Y", "K", "IMAGE"];
  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden(); 
      
  });
  
  //Load data
  function DatenLaden(){
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway
    
    if(IsDataBaseOffline(res)) return; //Check if database is available

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
      setCsvData([]);
      return;
    }

    if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
    setAllData(res.data.body); //Set new table data

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

  }

  //TabAuswahl Change Event
  function AuswahlChange(newValue){
   
      if (newValue === "Alle" ) { SetAuswahlBackgroundColor(["#d8dce4"]); setFilterData([]); setFilterDataPoCode([]); return;}
      //SetAuswahlBackgroundColor(newValue); //Background color change  
      setFilterData([newValue])
      setFilterDataPoCode(["N", "Q", "R"]);

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

  const filterOpen = () => {

    try {

    sleep(400).then(() => { //Reload data

      var counter = 0;

     for (var i in document.getElementsByClassName("MuiGrid-root MuiGrid-container").item(5).children)  
      {
        var child = document.getElementsByClassName("MuiGrid-root MuiGrid-container").item(5).children[counter];
        if(child === undefined || child === '') return;

        if(child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1") === undefined) return;
        var childLabel = child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1")[0].innerHTML;

        if (childLabel === undefined || childLabel === '') return;

         if (childLabel === "N")
        {
          child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1")[0].innerHTML = "Neuer Auftrag";
        }

        else if (childLabel === "P")
        {
          child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1")[0].innerHTML = "Vorproduktion";
        }

        else if (childLabel === "Q")
        {
          child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1")[0].innerHTML = "Qualitätskontrolle";
        }
        
        else if (childLabel === "R")
        {
          child.getElementsByClassName("MuiTypography-root MuiFormControlLabel-label jss288 MuiTypography-body1")[0].innerHTML = "Retoure";
        } 

            
        counter += 1;

      }
 
    });

    }


  catch (e) {console.log("Error in filter update names")}

};

 //Update status in planning to in production
  function updateProdStatus(){  
      
    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
        alert("Bitte Positionen auswählen!");
        return;
      }

    var pKs = filterPks(selectedData);
    var pKs_json = JSON.parse(JSON.stringify(pKs));

    console.log(pKs_json);

    //Update V&V Status
    axios.put("https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/orderitems?status=3", pKs_json)
    .then(res => {
      console.log(res);

    })
    .catch(err => {
      console.log(err.message); //Error-Handling
    });

    //Update Production table from Prod_status 0 to 1 (In Planung zu In Färbung)
    axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateplanningtoprod", pKs_json)
    .then(res => {
      console.log(res);
      cssMessage("Erfolgreich in die Färbung gegeben.", "#4dff88");
    })
    .catch(err => {
      console.log(err.message); //Error-Handling
      cssMessage("Error.", "#9c2c2c");
    }); 

    sleep(900).then(() => { 
      setSelectedData(undefined); 
      DatenLaden(); 
      
    }); 
     
    return;
}

//Update to 'in Druck'
function inDruckStatus(){

  if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
    alert("Bitte Positionen auswählen!");
    return;
  }

      var pKs = filterPks(selectedData);
      var pKs_json = JSON.parse(JSON.stringify(pKs));
      console.log(pKs_json)

    //Update V&V Status
    axios.put("https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/orderitems?status=3", pKs_json)
    .then(res => {
      console.log(res);

    })
    .catch(err => {
      console.log(err.message); //Error-Handling
    });

  //Update Production table from 'In Planung' to 'In Druck'
   axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updatefaerbeorders", pKs_json)
  .then(res => {
    console.log(res);
    cssMessage("Erfolgreich in den Druck gegeben.", "#4dff88"); 
  })
  .catch(err => {
    console.log(err.message); //Error-Handling
    cssMessage("Error.", "#9c2c2c"); 
  })  

  sleep(900).then(() => { //Reload data
    setSelectedData(undefined); 
    DatenLaden(); 
  }); 

return;
}

//Success and error messages
function cssMessage(message, color)
{ //Set
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

//Sleep for asynchronous calls
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Get only primary keys from selected orders
function filterPks(selectedData){
  var _pks = [];
 
  selectedData.forEach(element => {
    var singleVal = {};
    singleVal["O_NR"] = element["O_NR"];
    singleVal["OI_NR"] = element["OI_NR"];
    singleVal["PO_CODE"] = element["PO_CODE"];
    singleVal["PO_COUNTER"] = element["PO_COUNTER"];
    _pks.push(singleVal);
  });

  return _pks; 
}


//RowSelectEvent
function rowSelectEvent(curRowSelected, allRowsSelected){ 

  var _selectedData = [];

  if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
    setQuantity(0); //Menge auf 0 setzen
    setQuantityColor("#088A08");
    setSelectedData(undefined);
    setCsvData([]);
    return;
  }
  
  allRowsSelected.forEach(element => { //Get selected orders
    _selectedData.push(allData[element.dataIndex])
  });

  updateQuantity(_selectedData);
  setSelectedData(_selectedData);

  var _sortedCsvData = _selectedData;

  //Sortieren der Delta-E Werte von Hell nach Dunkel
  _sortedCsvData.sort(function(a,b){
    return b.DELTA_E - a.DELTA_E;
  });

  setCsvData(_sortedCsvData);
  return;
}

//Update quantities
function updateQuantity(selecteDataFromTable){

  var quantity = 0

  if (selecteDataFromTable === undefined || selecteDataFromTable.length === 0) {
      setQuantity(0)
      return;
  }

  selecteDataFromTable.forEach(element => {
    if (element === undefined || element["QUANTITY"] === undefined ) {
      setQuantity(0)
      return;
    }

    quantity += element["QUANTITY"]
  });
  setQuantity(quantity)

  if(quantity > 350) setQuantityColor("#FF0040");
  else setQuantityColor("#088A08");

  return;
}

  return (
  <div>
    
    <MUIDataTable 
        title={"Planungsaufträge"}
        data={allData}      
        columns={columns}
        options={options}/>
    <br/>
    <br/>
    <Button variant="contained" onClick={updateProdStatus} title="Mit Klick auf diesen Button wird eine CSV-Datei mit allen markierten Aufträgen erstellt. 
    Außerdem ändert sich der Status auf 'in Färbung'.">
    <CSVLink data={csvdata} headers={csvheaders} style={{textDecoration: "none", color: "black"}} filename={"MachineConfiguration.csv"}>In Färbung (CSV)</CSVLink>
    <GetAppIcon/>  
    </Button>  
    <text name="DummySeperator">  </text>
    <Button variant="contained" onClick={inDruckStatus} title="Mit Klick auf diesen Button werden alle markierten Planungsaufträge in den Druck gegeben." >In Druck geben</Button>
    </div>
  );
}