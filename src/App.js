import React from 'react'
import Footer from './partials/Footer';
import Header from './partials/Header';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
import Taskview from './component/pages/Taskview';
import Taskedit from './component/pages/Taskedit';
import Projectedit from './component/pages/Projectedit';
import Notfound from './component/Notfound';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="view" element={<Taskview />} />
            <Route path="task/edit" element={<Taskedit />} />
            <Route path="project/edit" element={<Projectedit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
