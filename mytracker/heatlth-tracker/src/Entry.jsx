// import React, { useState, useEffect } from 'react';
// import './Entry.css';

// function Entry() {
//     const [bodyParts, setBodyParts] = useState([]);
//     const [selectedPart, setSelectedPart] = useState('');
//     const [motifs, setMotifs] = useState([]);
//     const [intensity, setIntensity] = useState(1);
//     const [date, setDate] = useState('');
//     const [precisions, setPrecisions] = useState('');
//     const [selectedMotifs, setSelectedMotifs] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8081/bodyPartsAndMotifs')
//       .then((response) => response.json())
//       .then((data) => {
//         setBodyParts(data);
//       })
//       .catch((error) => console.error('Error fetching body parts and motifs:', error));
//   }, []);

//   const handleBodyPartChange = (e) => {
//     const partId = e.target.value;
//     setSelectedPart(partId);

//     const selectedBodyPart = bodyParts[partId - 1];
//     setMotifs(selectedBodyPart ? selectedBodyPart.motifs : []);
//   };

//   const handleIntensityChange = (e) => {
//     setIntensity(e.target.value);
//   };

//   const getSliderBackgroundColor = (value) => {
//     const colors = ['blue', 'green', 'yellow', 'orange', 'red'];
//     const leftColor = colors[value - 1];
//     const rightColor = colors[value];

//     return `linear-gradient(to right, ${leftColor}, ${rightColor})`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     const selectedMotifs = motifs
//       .filter((motif) => document.querySelector(`input[name="motif"][value="${motif.motif}"]`).checked)
//       .map((motif) => motif.motif);

//     const entryData = {
//       date: document.querySelector('input[type="date"]').value,
//       intensity,
//       additionalNotes: document.querySelector('textarea').value,
//       selectedMotifs
//     };

//     fetch('http://localhost:8081/submitEntry', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(entryData),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // Optionally reset form or show a success message
//     })
//     .catch((error) => console.error('Error submitting entry:', error));
//   };

//   return (
//     <div className="Entry">
//       <header className="App-header">
//         <img src="Health tra.png" id="logo" alt="logo" />
//       </header>
    
//       <div className="ill">
//         <form onSubmit={handleSubmit}>
//           <span id="ligne1">
//             <label className="category">Partie du corps</label>
//             <select 
//               value={selectedPart} 
//               onChange={handleBodyPartChange}
//             >
//               <option value="">Sélectionnez une partie du corps</option>
//               {bodyParts.map((part) => (
//                 <option key={part.id} value={part.id}>
//                   {part.part}
//                 </option>
//               ))}
//             </select>
                
//             <label className="category date">Date
//               <input type="date" />
//             </label>
//           </span>

//           <span id="ligne2">
//             <label className="category">Motifs</label>
//             {motifs.length > 0 ? (
//               motifs.map((motif) => (
//                 <label key={motif.id}>
//                   <input type="checkbox" name="motif" value={motif.motif} />
//                   {motif.motif}
//                 </label>
//               ))
//             ) : (
//               <p>Aucun motif disponible pour cette partie du corps.</p>
//             )}
//           </span>
//           <span id="ligne3">
//             <label className="category">Intensité</label>
//             <input
//               type="range"
//               min="1"
//               max="5"
//               value={intensity}
//               onChange={handleIntensityChange}
//               style={{ 
//                 background: getSliderBackgroundColor(intensity)
//               }}
//             />
//             <span>{intensity != 0 ? (intensity - 1) * 25 : intensity}%</span>
//           </span>
//           <span id="ligne4">
//             <label className="category">Apportez des précisions
//               <textarea></textarea>
//             </label>
//           </span>

//           <span id="ligne5">
//             <input type="submit" className="send" />
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Entry;

import React, { useState, useEffect } from 'react';
import './Entry.css';
import {useNavigate, useParams} from 'react-router-dom';
function Entry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState('');
  const [motifs, setMotifs] = useState([]);
  const [intensity, setIntensity] = useState(1);
  const [date, setDate] = useState('');
  const [precisions, setPrecisions] = useState('');
  const [selectedMotifs, setSelectedMotifs] = useState([]);

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
    const partId = e.target.value;
    setSelectedPart(partId);

    const selectedBodyPart = bodyParts.find(part => part.id === parseInt(partId));
    setMotifs(selectedBodyPart ? selectedBodyPart.motifs : []);
  };

  const handleIntensityChange = (e) => {
    setIntensity(e.target.value);
  };

  const handleMotifChange = (e) => {
    const { value, checked } = e.target;
    setSelectedMotifs(prev => 
      checked ? [...prev, value] : prev.filter(motif => motif !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const entryData = {
      date,
      intensity,
      precisions,
      motifs: selectedMotifs,
    };

    const method = id ? 'PUT' : 'POST';
    const test = id ? `http://localhost:8081/entries/${id}` : 'http://localhost:8081/submitEntry';

    fetch(test, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        navigate('/Journal');
      })
      .catch((error) => console.error('Error saving entry:', error));
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
