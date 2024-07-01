

import {BrowserRouter, Routes, Route  } from 'react-router-dom'
import Upload_files from './Compo/Upload_files';
import Home from './Compo/Home';
function App() {
  return (

    <BrowserRouter>
    <Routes>
   
      <Route path="/view" element={<Upload_files />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/format" element={<Home />}></Route>
      <Route path="/domain" element={<Home />}></Route>
      <Route path="/temporal_consistency" element={<Home />}></Route>
      <Route path="/AccuracyoftimeMeasurement" element={<Home />}></Route>
      <Route path="/temporal_Temporal" element={<Home />}></Route>
      <Route path="/domain" element={<Home />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
