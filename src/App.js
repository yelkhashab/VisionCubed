import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Landing from './pages/Landing/Landing';
import Practice from './pages/Practice/Practice';
import Solve from './pages/Solve/Solve';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
      <Helmet>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="roofpig_and_three.min.js"></script>
      </Helmet>
    </>
  )
}