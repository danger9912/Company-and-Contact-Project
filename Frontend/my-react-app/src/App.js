

import {BrowserRouter, Routes, Route  } from 'react-router-dom'
import Upload_files from './Compo/Upload_files';
import Home from './Compo/Home';
import Format from './Compo/Format'
function App() {
  return (

    <BrowserRouter>
    <Routes>
   
      <Route path="/view" element={<Upload_files />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/format" element={<Format />}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
