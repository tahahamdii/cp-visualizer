// App.js
import React, { useState, useEffect } from 'react';
import Controls from '../src/components/Controls';
import Visualization from '../src/components/Visualization';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCode, setCurrentCode] = useState('');


  // App.js (partial)
const [selectedOperation, setSelectedOperation] = useState('');
const [inputs, setInputs] = useState({ value: '', index: '' });

const handleOperationChange = (e) => {
  setSelectedOperation(e.target.value);
  setInputs({ value: '', index: '' }); // Reset inputs
};


const renderOperationInputs = () => {
  switch (selectedOperation) {
    case 'Create':
      return (
        <>
          <input
            type="text"
            placeholder="Array Values (comma-separated)"
            value={inputs.value}
            onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
          />
        </>
      );
    case 'Insert':
    case 'Update':
      return (
        <>
          <input
            type="number"
            placeholder="Index"
            value={inputs.index}
            onChange={(e) => setInputs({ ...inputs, index: e.target.value })}
          />
          <input
            type="number"
            placeholder="Value"
            value={inputs.value}
            onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
          />
        </>
      );
    case 'Remove':
    case 'Select':
      return (
        <>
          <input
            type="number"
            placeholder="Index"
            value={inputs.index}
            onChange={(e) => setInputs({ ...inputs, index: e.target.value })}
          />
        </>
      );
    default:
      return null;
  }
};

  const handleCreate = () => {
    const values = inputs.value.split(',').map((v) => v.trim());
    setArray(values);
  };
  
  const handleInsert = () => {
    const index = parseInt(inputs.index);
    const value = inputs.value;
    const newArray = [...array];
    const steps = [];
  
    // Update code step 1: Start insert operation
    setCurrentCode(`
      // Start Insert Operation
      let newArray = [...array];
      let value = ${value};
      let index = ${index};
    `);
  
    // Step 1: Highlight the insertion index
    steps.push({
      array: [...newArray],
      highlighted: [index],
    });
  
    // Step 2: Shift elements to the right and update code
    for (let i = newArray.length; i > index; i--) {
      newArray[i] = newArray[i - 1];
      steps.push({
        array: [...newArray],
        highlighted: [i - 1, i],
      });
  
      // Update code step 2: Shift elements
      setCurrentCode((prevCode) => prevCode + `
        newArray[${i}] = newArray[${i - 1}];
      `);
    }
  
    // Step 3: Insert the new value and update code
    newArray[index] = value;
    steps.push({
      array: [...newArray],
      highlighted: [index],
    });
  
    // Final code update for insertion
    setCurrentCode((prevCode) => prevCode + `
      newArray[${index}] = ${value};
      // End of insert operation
    `);
  
    // Set animation steps
    setAnimationSteps(steps);
    setCurrentStep(0);
  };

  const handleUpdate = () => {
    const index = parseInt(inputs.index);
    const value = inputs.value;
    const newArray = [...array];
    const steps = [];
  
    if (index < 0 || index >= newArray.length) {
      setCurrentCode('Error: Index out of bounds');
      return;
    }
  
    // Update code: Start update operation
    setCurrentCode(`
      // Start Update Operation
      let newArray = [...array];
      let index = ${index};
      let value = ${value};
    `);
  
    // Step 1: Highlight the element to be updated
    steps.push({
      array: [...newArray],
      highlighted: [index],
    });
  
    // Step 2: Update the value
    newArray[index] = value;
    steps.push({
      array: [...newArray],
      highlighted: [index],
    });
  
    // Final code update for updating the element
    setCurrentCode((prevCode) => prevCode + `
      newArray[${index}] = ${value};
      // End of update operation
    `);
  
    setAnimationSteps(steps);
    setCurrentStep(0);
  };
  

  const handleRemove = () => {
    const index = parseInt(inputs.index);
    const newArray = [...array];
    const steps = [];
  
    if (index < 0 || index >= newArray.length) {
      setCurrentCode('Error: Index out of bounds');
      return;
    }
  
    // Update code: Start remove operation
    setCurrentCode(`
      // Start Remove Operation
      let newArray = [...array];
      let index = ${index};
    `);
  
    // Step 1: Highlight the element to be removed
    steps.push({
      array: [...newArray],
      highlighted: [index],
    });
  
    // Step 2: Shift elements to the left
    for (let i = index; i < newArray.length - 1; i++) {
      newArray[i] = newArray[i + 1];
      steps.push({
        array: [...newArray],
        highlighted: [i, i + 1],
      });
  
      // Update code: Shift elements
      setCurrentCode((prevCode) => prevCode + `
        newArray[${i}] = newArray[${i + 1}];
      `);
    }
  
    // Step 3: Remove the last element (now duplicate)
    newArray.pop();
    steps.push({
      array: [...newArray],
      highlighted: [],
    });
  
    // Final code update for removing
    setCurrentCode((prevCode) => prevCode + `
      newArray.pop();
      // End of remove operation
    `);
  
    setAnimationSteps(steps);
    setCurrentStep(0);
  };
  
  
  
  

  useEffect(() => {
    if (animationSteps.length > 0 && currentStep < animationSteps.length) {
      const timeout = setTimeout(() => {
        const step = animationSteps[currentStep];
        setArray(step.array);
        setHighlightedIndices(step.highlighted);
        setCurrentStep(currentStep + 1);
      }, 1000); // Adjust timing as needed
      return () => clearTimeout(timeout);
    } else {
      setHighlightedIndices([]);
    }
  }, [currentStep, animationSteps]);
  
  const handleSubmit = () => {
    switch (selectedOperation) {
      case 'Create':
        handleCreate();
        break;
      case 'Insert':
        handleInsert();
        break;
      case 'Remove':
        handleRemove();
        break;
      case 'Update':
        handleUpdate();
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="App">
      <div className="left-panel">
        <Controls
          onOperationChange={handleOperationChange}
          onSubmit={handleSubmit}
          operationInputs={renderOperationInputs()}
        />
      </div>
      <div className="right-panel">
        <Visualization array={array} highlightedIndices={highlightedIndices} />
      </div>

      {/* <div className="code-display">
        <h3>Current Operation Code</h3>
        <pre>{currentCode}</pre>
      </div> */}
    </div>
  );
}

export default App;
