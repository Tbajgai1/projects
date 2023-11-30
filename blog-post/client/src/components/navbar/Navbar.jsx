import './navbar.css'
import logo from '../../assets/allthingscoding.png';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';


import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  const [showLinkList, setShowLinkList] = useState(false);
  const [showProf, setShowProf] = useState(false);
  const [downArrow, setDownArrow] = useState(false);
  

  const linkListsRef = useRef(null);


  let imageUrl = null;
  if(currentUser && currentUser.img !== null) {
    imageUrl = currentUser.img;
  }
  if(currentUser && currentUser.img === 'Null') {
    imageUrl = "avatar.png";
  }

  //for main menu
  const handleDocumentClick = (e) => {
    if (linkListsRef.current && !linkListsRef.current.contains(e.target)) {
      setShowLinkList(false);
    }
  };



  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  
  //for showProf menu
  const handleDocumentClickProf = (e) => {
    if (linkListsRef.current && !linkListsRef.current.contains(e.target)) {
        setShowProf(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClickProf);

    return () => {
      document.removeEventListener('click', handleDocumentClickProf);
    };
  }, []);

  const toggleLinkLists = () => {
    setShowLinkList(!showLinkList);
    setDownArrow(!downArrow);
  }

  const toggleProf = () => {
    setShowProf(!showProf);
  }

  return (
    <div className="navBar">
      <div className="container">
        <div className="logo">
          <Link className='logo' to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="links" ref={linkListsRef}>
          <div className='linkLists'>
            <div   className={`linkListsAb ${showLinkList && 'show' }`}>
              <Link className="link" to="/?cat=webdev" onClick={toggleLinkLists}>
                Web-dev
              </Link>
              <Link className="link" to="/?cat=frontend" onClick={toggleLinkLists}>
                Front-end
              </Link>
              <Link className="link" to="/?cat=backend" onClick={toggleLinkLists}>
                back-end
              </Link>
              <Link className="link" to="/?cat=fullstack" onClick={toggleLinkLists}>
                Full-stack
              </Link>
              <Link className="link" to="/?cat=softwaredev" onClick={toggleLinkLists}>
                software-dev
              </Link>
            {/* Down arrow  */}
            <div className={`down-arrow ${downArrow && 'down-arrow-tablet'}`} onClick={toggleLinkLists} >
              {
                showLinkList ? (
                  <IoIosArrowDropup className='downArrow'/>
                ) : (
                  <IoIosArrowDropdown className='downArrow'/>
                )
              }
            </div>
            </div>
          </div>

          <div className={`profileAcc ${showProf && 'show'}`} ref={linkListsRef}>
            <span className='dots-wrapper' onClick={toggleProf}>
              <BiDotsHorizontalRounded className='dots'/>
            </span>
            <div className={`prof-wrapper ${showProf && 'show'}`} >
              <Link className="link writelink" to="/write" onClick={toggleProf}>
                create
              </Link>
                {currentUser ? <span onClick={ logout } className="logout">Logout</span> : <Link onClick={toggleProf} className='login' to="/login">Login</Link>}

              <span className='user'>
                <span>
                  {currentUser && imageUrl !== null ? (
                      <img className='profImg' src={`/profImg/${imageUrl}`} alt="profile" />
                    ) : (
                      !currentUser ? null : <img className='profImg' src={`/profImg/avatar.png`} alt="avatar" />
                  )}
                </span>

                <Link className='nameLink'>
                  {currentUser?.username}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;