import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

import './loginsignup.css';
import logo from '../../assets/allthingscoding.png';

function Register() {
  const [img, setImg] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/profImg", formData, config);
      return res.data;
    } catch (err) {
      // console.log(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(username && email && password) {
      try {
        const imgUrl = await upload();
        await axios.post(`/auth/register`, {
          username,
          email,
          password,
          img: img ? imgUrl : "",
        });
        navigate('./login');
      } catch (error) {
        setError(error.response.data);
      }
    } else {
      setError("Please Enter all required fields");
    }


  };

  return (
    <div className="auth">
      <div className="logo">
        <Link className='logo' to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <h2>Sign Up</h2>
      <form>
        {error && <p className='errorMsg'>{error}</p>}
        <input className='profImg' type="file" id="file" name="file" onChange={(e) => setImg(e.target.files[0])} />
        <label className='profImglabel' htmlFor="file">Profile Image</label>
        <input required type="text" name='username' placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input required type="email" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleSubmit}>Sign up</button>
        <span>Already Registered? 
          <Link className='link' to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
