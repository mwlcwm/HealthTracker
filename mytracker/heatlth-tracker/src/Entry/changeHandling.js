import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

export const variables = (id) => {
    const navigate = useNavigate();
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedPart, setSelectedPart] = id ? useState(1) : useState('');
    const [motifs, setMotifs] = useState([]);
    const [intensity, setIntensity] = useState(1);
    const [date, setDate] = id  ? useState('0000-00-00') : useState('');
    const [precisions, setPrecisions] = useState('');
    const [selectedMotifs, setSelectedMotifs] = useState([]);
    return {
        navigate, bodyParts, setBodyParts, selectedPart, setSelectedPart,
        motifs, setMotifs, intensity, setIntensity, date, setDate, precisions,
        setPrecisions, selectedMotifs, setSelectedMotifs
    };
}

const handleBodyPartChange = (e, setSelectedPart, bodyParts, setMotifs) => {
    const partId = e.target.value;
    setSelectedPart(partId);

    const selectedBodyPart = bodyParts.find(part => part.id === parseInt(partId));
    setMotifs(selectedBodyPart ? selectedBodyPart.motifs : []);
  };

  const handleIntensityChange = (e, setIntensity) => {
    setIntensity(e.target.value);
  };

  const handleMotifChange = (e, setSelectedMotifs) => {
    const { value, checked } = e.target;
    setSelectedMotifs(prev => 
      checked ? [...prev, value] : prev.filter(motif => motif !== value)
    );
  };
  const handleSubmit = (e, motifs, id, navigate) => {
    e.preventDefault();

    const selectedMotifs = motifs
      .filter((motif) => document.querySelector(`input[name="motif"][value="${motif.motif}"]`).checked)
      .map((motif) => motif.motif);

    const entryData = id ? {
      date,
      intensity,
      precisions,
      motifs: selectedMotifs,
    } : {
      date: document.querySelector('input[type="date"]').value,
      intensity,
      additionalNotes: document.querySelector('textarea').value,
      selectedMotifs
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8081/entries/${id}` : 'http://localhost:8081/submitEntry';

    fetch(url, {
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
}

export default {handleBodyPartChange, handleIntensityChange, handleMotifChange, handleSubmit};