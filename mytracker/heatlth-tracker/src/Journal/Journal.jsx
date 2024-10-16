import React, { useEffect, useState } from 'react';
import './Journal.css';

// Handling the display of the several entries getting them from db
function Journal() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/entries') // Get entries
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => console.error('Error fetching entries:', error));
  }, []);

  const getIntensityColor = (intensity) => {
    const colors = ['#00FF00', '#FFFF00', '#FFA500', '#FF0000'];
    return colors[intensity - 1] || '#FFFFFF';
  };

  return (
    <html>
    <body>  
    <header className="App-header">
        <img src="Health tra.png" id="logo" alt="logo" />
      </header>
    <div className="Journal">
      
      <h1 className="page_title"></h1>
      <div id="tracker">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div 
              key={entry.ID} 
              className="entry"
              style={{ backgroundColor: getIntensityColor(entry.INTENSITÉ) }} // Set intensity colors for the entries
            >
              <h2>Entrée #{entry.ID}</h2>
              <span className="reason">Motifs: {entry.motifs || 'Aucun motif'}</span>
              <span id="date">Le: {entry.DATE}</span>
              <p>{entry.PRÉCISIONS || 'Aucune précision'}</p>
              <a href={`http://localhost:5173/Entry/${entry.ID}`}>  {/*When clicking on entries, redirecting user to the entry with its ID*/}
                <button className="edit">Modifier</button>
              </a>
            </div>
                      ))
        ) : (
          <div className="entry">
            <h2>Aucune entrée trouvée</h2>
          </div>
        )}
      </div>

      <a href="http://localhost:5173/Entry">
        <button className="add">+</button>
      </a>
    </div>
    </body>
    </html>
  );
}

export default Journal;
