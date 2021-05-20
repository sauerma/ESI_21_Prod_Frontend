import React from 'react';
import Faq from 'react-faq-component';

export default function FaqBereich() {

    const data = {
        title: "FAQ",
        rows: [
          {
            title: "Wie lässt sich eine CSV-Datei mit den geplanten Produktionsaufträgen für die Maschine erstellen?",
            content: "Im Tab 'Planung' werden die Aufträge automatisch nach deren Priorität sortiert. Der User kann nun Aufträge auswählen und sich über den Button 'CSV erzeugen' eine CSV-Datei für die Maschine erstellen lassen."
            
          },
          {
            title: "Wie erfolgt die Sortierung in der Produktionsplanung und wie werden die Aufträge in der CSV-Datei angeordnet?",
            content: "In der Planung werden die Aufträge automatisch nach ihrer Priorität sortiert und können auf Basis der Sortierung oder manuell in die Produktion gegeben werden. In der CSV-Datei werden die Aufträge nach der T-Shirt Helligkeit angeordnet."
          },
          {
            title: "Wie können Materialien in der Materialwirtschaft bestellt werden?",
            content: "Im Bereich des Materialmanagements können die gewünschten Mengen an T-Shirts und Farben eingegeben und bestellt werden."
          },
          {
            title: "Wie lassen sich Qualitätswerte von Materialien ausgeben?",
            content: "Im Bereich des Materialmanagements können die Qualtiätswerte aller Chargen eingesehen werden."
          }]
      }

      const styles = {
        bgColor: '282828',
        titleTextColor: "white",
        rowTitleColor: "white",
        rowContentColor: 'white',
        arrowColor: "white",
    };

    const config = {
        animate: true,
      // arrowIcon: "V",
        tabFocus: true
    };
    

  return (

          <div style={{ padding: '2px'}}>
            <Faq data={data} styles={styles} config={config} />
          </div>
      
  );
}