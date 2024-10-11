import React, { useState, useEffect } from 'react';
import './Entry.css';
import {useParams} from 'react-router-dom';
import changeHandling, { variables } from './changeHandling';
function Entry() {
  const { id } = useParams();
  const {navigate, bodyParts, setBodyParts, selectedPart, setSelectedPart,
    motifs, setMotis, intensity, setIntensity, date, setDate, precisions,
    setPrecisions, selectedMotifs, setSelectedMotifs} = variables(id);
  useEffect(() => {
    fetch('http://localhost:8081/bodyPartsAndMotifs')
      .then((response) => response.json())
      .then((data) => {
        setBodyParts(data);
      })
    .catch((error) => console.error('Error fetching body parts and motifs:', error));

    if (id) {
        fetch(`http://localhost:8081/entries/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.DATE)
            setDate(data.DATE);
            setIntensity(data.INTENSITÉ);
            setPrecisions(data.PRÉCISIONS);
            setSelectedPart(data.PART_ID);
            setSelectedMotifs(data.motifs.split(','));
            console.log(data);
        })
        .catch((error) => console.error('Error fetching entry data:', error));
    }
  }, [id]);
  const handleBodyPartChange = (e) => {
    changeHandling.handleBodyPartChange(e, setSelectedPart, bodyParts, setMotis);
  };

  const handleIntensityChange = (e) => {
    changeHandling.handleIntensityChange(e, setIntensity);
  };

  const handleMotifChange = (e) => {
    changeHandling.handleMotifChange(e, setSelectedMotifs);
  };

  const handleSubmit = (e) => {
    changeHandling.handleSubmit(e, motifs, id, navigate);
  };
  const getSliderBackgroundColor = (value) => {
    const colors = ['blue', 'green', 'yellow', 'orange', 'red'];
    const leftColor = colors[value - 1];
    const rightColor = colors[value];
    return `linear-gradient(to right, ${leftColor}, ${rightColor})`;
  };

  return (
    <div className="Entry">
      <header className="App-header">
        <img src="Health tra.png" id="logo" alt="logo" />
      </header>
        <div className="ill">
          <form onSubmit={handleSubmit}>
            <span id="ligne1">
              <label className="category">Partie du corps</label>
              <select 
                value={selectedPart} 
                onChange={handleBodyPartChange}
              >
                <option value="">Sélectionnez une partie du corps</option>
                {bodyParts.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.part}
                  </option>
                ))}
              </select>
                  
              <label className="category date">Date
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                />
              </label>
            </span>

            <span id="ligne2">
              <label className="category">Motifs</label>
              {motifs.length > 0 ? (
                motifs.map((motif) => (
                  <label key={motif.id}>
                    <input 
                      type="checkbox" 
                      name="motif" 
                      value={motif.motif} 
                      checked={selectedMotifs.includes(motif.motif)} 
                      onChange={handleMotifChange} 
                    />
                    {motif.motif}
                  </label>
                ))
              ) : (
                <p>Aucun motif disponible pour cette partie du corps.</p>
              )}
            </span>
            
            <span id="ligne3">
              <label className="category">Intensité</label>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={handleIntensityChange}
                style={{ 
                  background: getSliderBackgroundColor(intensity)
                }}
              />
              <span>{intensity != 0 ? (intensity - 1) * 25 : intensity}%</span>
            </span>

            <span id="ligne4">
              <label className="category">Apportez des précisions
                <textarea 
                  value={precisions} 
                  onChange={(e) => setPrecisions(e.target.value)}
                ></textarea>
              </label>
            </span>

            <span id="ligne5">
              <input type='submit' className="send" />
            </span>
          </form>
        </div>
      </div>
  );
}
export default Entry;
