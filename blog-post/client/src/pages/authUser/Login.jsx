import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import logo from '../../assets/allthingscoding.png';

function Login() {
  
    const [inputs, setInputs] = useState({
      username: "",
      password: ""
    });
  
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
  
    const handleChange = e => {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      if(inputs.username && inputs.password) {
        try {
          await login(inputs);
          navigate("/");
        } catch (error) {
          setError(error.response.data);
        }
      } else {
        setError("Please enter Username and Password");
      }

    };
    

  return (
    <div className="auth">
      <div className="logo">
        <Link className='logo' to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <h2>Login</h2>
      <form >
        {error && <p className='errorMsg'>{error}</p>}
        <input type="text" placeholder="UserName" name='username' onChange={handleChange}/>
        <input type="password" placeholder="Password" name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        <span>Don't have an account? 
          <Link className='link' to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login