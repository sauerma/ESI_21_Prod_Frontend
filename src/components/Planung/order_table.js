import React from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from 'axios'

export default function DataTable() {
  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Delta E", "Hex-Wert", "Farbe", "Priorität", "Bild"];
  var data = [
    ["2021-04-21 11:50:05", "B-20000000-1", "1", "200", "In Planung", "1.324234", "#34923", "Marine", "1", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "2", "21", "In Planung", "1.324234", "#34923", "Rot", "1", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "3", "2", "In Planung", "1.324234", "#34923", "Blau", "2", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "4", "3", "In Produktion", "1.324234", "#34923t", "Grün", "2", "/home/img/tshirt123123.png"],
    ];
  const options = {
  filterType: 'checkbox',
};


function getPlanningOrders()
{
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders').then(
    (res) => {
      console.log(res.data.body);
    }
  )
}

  return (
  <div>
    <Button  variant="contained" onClick={getPlanningOrders}> Aktualisieren </Button>
    <br/>
    <br/>
    <MUIDataTable 

        title={"Planungsaufträge"}
        data={data}
        columns={columns}
        options={options} />
    <br/>
    <br/>
    <Button  variant="contained">CSV erstellen</Button>
    </div>
  );
}