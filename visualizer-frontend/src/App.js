import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [algorithms, setAlgorithms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/algorithms')
            .then(response => setAlgorithms(response.data.algorithms))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="App">
            <h1>Algorithm Visualizer</h1>
            <h2>Available Algorithms:</h2>
            <ul>
                {algorithms.map((algo, index) => (
                    <li key={index}>{algo}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
