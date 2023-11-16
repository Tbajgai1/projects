import './footer.css';
import logo from '../../assets/allthingscoding.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <img src={logo} alt="logo" />
        <p className='right'>
          created using React.js and Node.js || <span className='name'>T.B</span>
        </p>
      </div>
    </div>
  )
}

export default Footer;