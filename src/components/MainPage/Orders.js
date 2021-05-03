import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Generate Order Data
function createData(id, bestelldatum, bestellnr, produktionsnr, menge, status, delta_e, hex_wert, farbe, prioritaet, bild) 
{
  return { id, bestelldatum, bestellnr, produktionsnr, menge, status, delta_e, hex_wert, farbe, prioritaet, bild};
}

const rows = [
    createData(0, "2021-04-21 11:50:05", "B-20000000-1", "1", "200", "In Planung", "1.324234", "#34923", "Marine", "1", "/home/img/tshirt123123.png"),
    createData(1, "2021-04-21 11:50:05", "B-20000000-1", "2", "21", "In Planung", "1.324234", "#34923", "Rot", "1", "/home/img/tshirt123123.png"),
    createData(2, "2021-04-21 11:50:05", "B-20000000-1", "3", "2", "In Planung", "1.324234", "#34923", "Blau", "2", "/home/img/tshirt123123.png"),
    createData(3, "2021-04-21 11:50:05", "B-20000000-1", "4", "3", "In Produktion", "1.324234", "#34923t", "Grün", "2", "/home/img/tshirt123123.png"),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h2>Letzte Produktionsaufträge</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bestelldatum</TableCell>
            <TableCell>Bestellnr</TableCell>
            <TableCell>Produktionsnr</TableCell>
            <TableCell>Menge</TableCell> 
            <TableCell>Status</TableCell>
            <TableCell>Delta E</TableCell>
            <TableCell>Hex-Wert</TableCell>
            <TableCell>Farbe</TableCell>
            <TableCell>Priorität</TableCell>
            <TableCell>Bild</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow key={row.id}>
              <TableCell>{row.bestelldatum}</TableCell>
              <TableCell>{row.bestellnr}</TableCell>
              <TableCell>{row.produktionsnr}</TableCell>
              <TableCell>{row.menge}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.delta_e}</TableCell>
              <TableCell>{row.hex_wert}</TableCell>
              <TableCell>{row.farbe}</TableCell>
              <TableCell>{row.prioritaet}</TableCell>
              <TableCell>{row.bild}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Alle anzeigen
        </Link>
      </div>
    </React.Fragment>
  );
}