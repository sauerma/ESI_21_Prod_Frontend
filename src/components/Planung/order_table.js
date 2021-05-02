import React from "react";
import MUIDataTable from "mui-datatables";

export default function DataTable() {
  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Delta E", "Hex-Wert", "Farbe", "Priorität", "Bild"];
  const data = [
    ["2021-04-21 11:50:05", "B-20000000-1", "1", "200", "In Planung", "1.324234", "#34923", "Marine", "1", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "2", "21", "In Planung", "1.324234", "#34923", "Rot", "1", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "3", "2", "In Planung", "1.324234", "#34923", "Blau", "2", "/home/img/tshirt123123.png"],
    ["2021-04-21 11:50:05", "B-20000000-1", "4", "3", "In Produktion", "1.324234", "#34923t", "Grün", "2", "/home/img/tshirt123123.png"],
    ];
  const options = {
  filterType: 'checkbox',
};

    return (
        <MUIDataTable
            title={"Planungsaufträge"}
            data={data}
            columns={columns}
            options={options}
        />
    );
}