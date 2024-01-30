import './styles/landingPage/landingPage.scss';
// import LandingPage from './components/LandingPage';
import LandingPage from './components/LandingPage';
import GameOne from './pages/GameOne';
import GameTwo from './pages/GameTwo';
import GameThree from './pages/GameThree';

import {
   BrowserRouter, Routes, Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main className="main-wrapper">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='game-one' element={<GameOne />}/>
          <Route path='game-two' element={<GameTwo />}/>
          <Route path='game-three' element={<GameThree />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
 