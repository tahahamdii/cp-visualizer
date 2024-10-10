import React from 'react';

const Controls = ({ onOperationChange, onSubmit, operationInputs }) => {
  const operations = ['Create', 'Insert', 'Remove', 'Select', 'Update'];

  return (
    <div className="controls">
      <h2>Array Operations</h2>
      <select onChange={onOperationChange}>
        <option value="">Select Operation</option>
        {operations.map((op, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
      {operationInputs}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Controls;