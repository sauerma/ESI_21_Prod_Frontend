/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {CSVLink} from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';

export default function DataTable() {

  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Hex-Wert", "Farbe", "Priorität", "Bild"];
  const options = { filterType: 'checkbox', download: false, onRowsSelect : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [data, setData] = useState([])  
  const [csvdata, setCsvData] = useState([])  
  const [Quantity, setQuantity] = useState("");
  const csvheaders = ["Bestelldatum", "BestellNr", "ProduktionsNr", "Menge", "Status", "Hex-Wert", "Farbe", "Priorität", "Bild"];

  useEffect(() => {
        
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders')
        .then(res => {
        
        console.log("RESPONSE:", res); //Data from Gateway

        if(IsDataBaseOffline(res)) return; //Check if db is available

        if(res.data.body.length === 0) { //Check if data is available
          setData(undefined);
          return;
        }          

        var sortedOrders = sortOrders(res.data.body); //Sort data from api 
        if (DataAreEqual(data, sortedOrders)) return; //Check if data has changed       
        setData(sortedOrders); //Set new data
  
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

  //Sort data from api
  function sortOrders(list){

    var sortedOrders = [];

    for (var key in list){

      var singleSortedList = null;
      singleSortedList = [];
      var unsortedOrders = Object.values(list[key]);
      
      singleSortedList.push(unsortedOrders[4]); //Bestelldatum
      singleSortedList.push(unsortedOrders[1]); //Bestellnummer
      singleSortedList.push(unsortedOrders[18]); //Produktionsnummer
      singleSortedList.push(unsortedOrders[6]); //Menge
      singleSortedList.push(StatusNrToBez(unsortedOrders[7])); //Status
      singleSortedList.push(unsortedOrders[14]); // Hex-Wert
      singleSortedList.push(unsortedOrders[9]); //Farbe
      singleSortedList.push(unsortedOrders[15]); //Priorität
      singleSortedList.push(unsortedOrders[16]); //Bild 
    
      sortedOrders.push(singleSortedList)
  }     
    return sortedOrders;
  }

  //Status-Nr to Status-Bez
  function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  }

  //Update status in planning to in production
 function update_prod_status(){  
    return;
  }


  //Get all checked Data in an Obj.Array of Arrays
  /*  function download_csv_file(selectedData) {


   var sortedDaten = csvDaten;
      sorted

  
let targets = Array.from(document.querySelectorAll("td input[type=checkbox]")).filter((elem) => {
      if(elem.checked) return elem 
      else return null})

    let csv_data = []

    targets.forEach((elem) => {
        let row = elem.closest(".MuiTableRow-root")
        let cols = Array.from(row.getElementsByTagName("td"))

        let array = []
        let obj = {}

        cols.forEach((col) => {
          let divs = Array.from(col.getElementsByTagName("div"))
          if(divs.length >= 2){
            let key = divs[0].innerHTML
            obj[key] = divs[1].innerHTML
            array.push(divs[1].innerHTML)
          }
        }) 
        csv_data.push(obj)
    }) 
    console.log(csv_data);
    setCsvData(csv_data);
 
    
    //Function in one Button
    // return(
    //   <CSVDownload 
    //     target="_self"
    //     headers={headers}
    //     data={csv_data}
    //     filename={"Test.csv"}
    //   />
    // )
  }  */

  //RowSelectEvent
  function rowSelectEvent(curRowSelected, allRowsSelected){ 

    var selectedData = [];
    
    if(allRowsSelected.length === 0) {         //Wenn keine Rows ausgewählt
      setQuantity(0); //Menge auf 0 setzen
      return;
    }

    allRowsSelected.forEach(element => {  //Convert all indexes to data array
      selectedData.push(data[(element.dataIndex)]);
    });

    updateQuantity(selectedData); //UpdateQuantity
    
    setCsvData(selectedData);

    return;
  }

  function updateQuantity(selecteDataFromTable){
    var quantity = 0;

    selecteDataFromTable.forEach(element => {
      quantity += element[3];
    });

    setQuantity(quantity);
    return;
  }


  return (
  <div>
    <MUIDataTable 
        title={"Planungsaufträge"}
        data={data}      
        columns={columns}
        options={options}/>
    <br/>
    <br/>
    <Button variant="contained" onClick={update_prod_status}>In Produktion geben</Button>
    <text name="DummySeperator">  </text>
    <Button variant="contained" onClick={update_prod_status}>
    <CSVLink data={csvdata} headers={csvheaders} filename={"MachineConfiguration.csv"}>Download CSV</CSVLink>
    <GetAppIcon/>  
    </Button>
    <text name="DummySeperato2">  </text>
    <Button variant="Quantity" style={{color: '#ffffff'}}>Menge: {Quantity}</Button>
    
    </div>
  );
}

    // //REST CALL Create CSV mit array Übergabe  
    // var data = { title: 'React POST Request Example' };    
    // axios.post('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/createcsv',data)
    //     .then(res => {      
        
    //     console.log("RESPONSE:", res); //Data from Gateway

    //   })
    //     .catch(err => {
    //         console.error('There was an error!', error); //Error-Handling
    //     });

  // }
// }
