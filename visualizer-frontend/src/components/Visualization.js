
import React from 'react';

const Visualization = ({ array, highlightedIndices }) => {
  return (
    <div className="visualization">
      {array.map((value, index) => (
        <div
          key={index}
          className={`array-element ${
            highlightedIndices.includes(index) ? 'highlight' : ''
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default Visualization;

