
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar'


export default function App() {

  const [progress, setProgress] = useState(0);

  

  return (
    <div>
      <Router>
        <NavBar title='NewsMonkey' />
        <LoadingBar
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={20} country='in' category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={20} country='in' category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={20} country='in' category='entertainment' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} pageSize={20} key="health" country='in' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={20} country='in' category='science' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={20} country='in' category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={20} country='in' category='technology' />} />
        </Routes>
      </Router>

    </div>
  )

}

