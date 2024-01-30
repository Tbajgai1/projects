import '../styles/landingPage/landingPage.scss';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div className='landing-wrapper'>
        <h2>Pick your game</h2>
        <div className="buttons">
            <Link to='/game-one'>
              <button className='game-one' >Game One</button>
            </Link>
            <Link to='/game-two'>
              <button className='game-two'>Game Two</button>
            </Link>
            <Link to='/game-three'>
              <button className='game-three'>Game Three</button>
            </Link>
        </div>

    </div>
  )
}

export default LandingPage;