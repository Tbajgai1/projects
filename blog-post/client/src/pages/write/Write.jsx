import 'react-quill/dist/quill.snow.css';
import './write.css';
import { AuthContext } from "../../context/authContext";

import { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import axios from "axios";
import moment from "moment";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
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
      const res = await axios.post("/upload", formData, config);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); // Wait for the upload to complete

    try {
      if (state) {
        // Update an existing post
        await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: img ? imgUrl : "", // Use imgUrl from upload
        });
        navigate("/");
      } else {
        // Create a new post
        if (!cat || !value || !title) {
          setError("Please fill required fields!");
        } else {
          await axios.post(`/posts`, {
            title,
            desc: value,
            cat,
            img: img ? imgUrl : "", // Use imgUrl from upload
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="write">
      <div className="container">
        <div className="content">
          <p className="error">{error && error}</p>
          <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
          </div>
        </div>
        <div className="menu">
          <div className="item1 item">
            <h3>Publish</h3>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input type="file" id="file" name="file" onChange={(e) => setImg(e.target.files[0])} />
            <label htmlFor="file">Upload Image</label>
            <div className="buttons">
              <button>Save as Draft</button>
              <button onClick={handleClick}>{state ? "Update" : "Publish"}</button>
            </div>
          </div>
          <div className="item2 item">
            <h3>Category</h3>
            <div className="cat">
              <input type="radio" checked={cat === "webdev"} name="cat" value="webdev" id="webdev" onChange={(e) => setCat(e.target.value)} />
              <label htmlFor="webdev">Web Dev</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "frontend"} name="cat" value="frontend" id="frontend" onChange={(e) => setCat(e.target.value)} />
              <label htmlFor="frontend">Front-End</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "backend"} name="cat" value="backend" id="backend" onChange={(e) => setCat(e.target.value)} />
              <label htmlFor="backend">Back-End</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "fullstack"} name="cat" value="fullstack" id="fullstack" onChange={(e) => setCat(e.target.value)} />
              <label htmlFor="fullstack">Full-stack</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat === "softwaredev"} name="cat" value="softwaredev" id="softwaredev" onChange={(e) => setCat(e.target.value)} />
              <label htmlFor="softwaredev">Software-dev</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="message">
      <h2>Please Log in to create a post!</h2>
      <div className='loginRegister'>
        <Link to={"/register"} className="link">
          Register
        </Link>
        <Link to={"/login"} className="link">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Write;
