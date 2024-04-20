import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Landing from './pages/Landing/Landing';
import Solve from './pages/Solve/Solve';
import Learn from './pages/Learn/Learn';
import Practice from './pages/Practice/Practice';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}