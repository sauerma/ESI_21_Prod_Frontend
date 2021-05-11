/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { CSVDownload, CSVLink} from "react-csv";

export default function DataTable() {

  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Hex-Wert", "Farbe", "Priorität", "Bild"];
  const options = { filterType: 'checkbox' };
  const [data, setData] = useState([])  
  const [csvdata, setCsvData] = useState([])

  //Headerline für CSV export
  const headers = [
    { label: "Bestelldatum", key: "Bestelldatum" },
    { label: "BestellNr", key: "Bestellnr" },
    { label: "ProduktionsNr", key: "Produktionsnr" },
    { label: "Menge", key: "Menge" },
    // { label: "Status", key: "Status" },
    { label: "Hex-Wert", key: "Hex-Wert" },
    { label: "Farbe", key: "Farbe" },
    { label: "Priorität", key: "Priorität" },
    { label: "Bild", key: "Bild" }
  ];
 
  // var testdata = [ ["2021-04-21 11:50:05", "B-20000000-1", "1", "200", "In Planung", "1.324234", "#34923", "Marine", "1", "/home/img/tshirt123123.png"],
  //     ["2021-04-21 11:50:05", "B-20000000-1", "2", "21", "In Planung", "1.324234", "#34923", "Rot", "1", "/home/img/tshirt123123.png"],
  //     ["2021-04-21 11:50:05", "B-20000000-1", "3", "2", "In Planung", "1.324234", "#34923", "Blau", "2", "/home/img/tshirt123123.png"],
  //     ["2021-04-21 11:50:05", "B-20000000-1", "4", "3", "In Produktion", "1.324234", "#34923t", "Grün", "2", "/home/img/tshirt123123.png"] ]; 

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

  //Get all checked Data in an Obj.Array of Arrays
  function download_csv_file() {
    console.log("download_csv_file aufgerufen");

    let targets = Array.from(document.querySelectorAll("td input[type=checkbox]")).filter((elem) => { if(elem.checked) return elem })

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
  }


  return (
  <div>
    <MUIDataTable 
        title={"Planungsaufträge"}
        data={data}      
        columns={columns}
        options={options} />
    <br/>
    <br/>
    <Button variant="contained" onClick={download_csv_file}>In Produktion geben</Button>
    <br/>
    <CSVLink data={csvdata} headers={headers} filename={"MachineConfiguration.csv"}>Download CSV Here</CSVLink>
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
