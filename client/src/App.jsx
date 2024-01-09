import { useState, useMemo } from 'react'
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import PATHROUTES from './helper/PathRoutes.js';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import About from './views/About/About.jsx';
import Form from './views/Form/Form.jsx';
import Detail from './views/Detail/Detail.jsx';
import Nav from './components/Nav/Nav.jsx'

function App() {
  const { pathname } = useLocation();
  const [games, setGames] = useState([]);

  const onSearch = async (id) => {
    const exists = games.find(char => char.id === Number(id));
    if (id === 'random') {
      // Fetch random game
      const randomId = Math.floor(Math.random() * 5679 + 1);

      axios(`http://localhost:3001/videogames/${randomId}`)
        .then(({ data }) => {
          if (data.name) {
            setGames((oldChars) => [...oldChars, data]);
          }
        });
    }
    if (exists) {
      window.alert('Ese Juego ya existe');
      return;
    }

    try {
      const { data } = await axios(`http://localhost:3001/videogames/${id}`);

      if (data.name) {
        setGames((oldChars) => [...oldChars, data]);
      } else if (id > 827) {
        window.alert('¡No hay juegos con este ID!');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const onClose = (id) => {
    setCharacters(
      characters.filter((char) => {
        return char.id !== id;
      })
    )
  }

  return (
    <div>
      {pathname !== '/' && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path={PATHROUTES.HOME} element={<Home games={games} onClose={onClose} />} />
        <Route path={PATHROUTES.LOGIN} element={<LandingPage />} />
        <Route path={PATHROUTES.ABOUT} element={<About />} />
        <Route path={PATHROUTES.FORM} element={<Form />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
