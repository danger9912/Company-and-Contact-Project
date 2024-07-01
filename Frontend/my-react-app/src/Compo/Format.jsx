import React, { useState } from 'react';

import FileFormat from './formatConsistency/FileFormat';
import Date from './formatConsistency/Date';
import Phone from './formatConsistency/Phone';


const FormatConsist = () => {
  const [selectedFormat, setSelectedFormat] = useState('FileFormat');

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <select
        value={selectedFormat}
        onChange={handleFormatChange}
        style={{
          padding: '10px',
          backgroundColor: '#f7f7f7',
          color: '#333',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          outline: 'none',
        }}
      >
       
        <option value="FileFormat">File Format</option>
        <option value="DateFormat">Date Format</option>
     
        <option value="Phone">phone Format</option>
  
      </select>

      {selectedFormat === "Phone" && <Phone />}
      {selectedFormat === "FileFormat" && <FileFormat />}
      {selectedFormat === "DateFormat" && <Date />}
     
    </div>
  )
}

export default FormatConsist;
