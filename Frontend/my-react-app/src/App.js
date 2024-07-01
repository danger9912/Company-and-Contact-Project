

import {BrowserRouter, Routes, Route  } from 'react-router-dom'
import Upload_files from './Compo/Upload_files';

function App() {
  return (

    <BrowserRouter>
    <Routes>
   
      <Route path="/" element={<Upload_files />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
