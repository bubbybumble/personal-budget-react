
import './App.css';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import AboutPage from './AboutPage/AboutPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>

          <Route path='/about.html' element={<AboutPage/>} />
          <Route path='/login.html' element={<LoginPage/>} />
          <Route path='/' element={<HomePage/>} />
          
        </Routes>

      </div>
      <Footer/>
    </Router>
  );
}

export default App;
