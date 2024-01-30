import '../styles/landingPage/landingPage.scss';
import { ClientComponent } from 'next/client';

const LandingPage = () => {

  const openPage = () => {
    console.log("Button clicked");
  }
  
  return (
    <div className='landing-wrapper'>
        <h2>Pick your game</h2>
        <div className="buttons">
          <ClientComponent>
            <button className='game-one' onClick={() => openPage()}>Game One</button>
          </ClientComponent>
            <button className='game-two'>Game Two</button>
            <button className='game-three'>Game Three</button>
        </div>

    </div>
  )
}

export default LandingPage;