import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchedulePage from './components/SchedulePage';
import ShowDetails from './components/ShowDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchedulePage />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
