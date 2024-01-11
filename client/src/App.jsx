import { Routes, Route, useLocation } from 'react-router-dom';
import PATHROUTES from './helper/PathRoutes.js';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Form from './views/Form/Form.jsx';
import Detail from './views/Detail/Detail.jsx';
import Nav from './components/Nav/Nav.jsx'
import './App.css';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== '/' && <Nav />}
      <Routes>
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.LANDING} element={<LandingPage />} />
        <Route path={PATHROUTES.FORM} element={<Form />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
