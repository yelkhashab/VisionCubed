import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Practice from './pages/Practice/Practice';
import Solve from './pages/Solve/Solve';
import Learn from './pages/Learn/Learn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solve" element={<Solve />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  )
}