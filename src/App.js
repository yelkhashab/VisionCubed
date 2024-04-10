import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Practice from './pages/Practice/Practice';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  )
}