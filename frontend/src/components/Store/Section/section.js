// src/components/Section.js
import React from 'react';

// Section Component
function Section({ children }) {
  return (
    <div className="section">
      {/* Container */}
      <div className="container">
        {/* Row */}
        <div className="row">
          {/* Render các component con truyền vào dưới dạng children */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Section;
