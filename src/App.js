import React, { useEffect, useState } from 'react'
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
import Projectcreate from './component/pages/Projectcreate';
import Taskcreate from './component/pages/Taskcreate';
import Login from './auth/Login';
import axios from 'axios';

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// const token = localStorage.getItem('_token')
// console.log(token)
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}


function App() {
  const [token,setToken] = useState(null)

  useEffect(() => {
      const token = localStorage.getItem('_token');
      setToken(token)
  })

  return (
    <div>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="home" element={<Home />} />
            <Route path="project/create" element={<Projectcreate />} />
            <Route path="task/create" element={<Taskcreate />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="view/:id" element={<Taskview />} />
            <Route path="task/edit/:id" element={<Taskedit />} />
            <Route path="project/:id/edit/" element={<Projectedit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
