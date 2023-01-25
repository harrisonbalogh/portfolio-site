import './header.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SocialIcons from './contact/SocialIcons'

const NAVIGATION_ROUTES = [
  '/',
  '/projects'
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  let { projectName: selectedProjectName } = useParams();

  /** Header reveal height - should match banner height */
  const calcRevealHeight = () => Math.max(window.innerHeight / 2, 240)

  /* State Variables */
  const [headerVisible, setHeaderVisible] = useState(location.pathname !== '/');
  const [revealHeight, setRevealHeight] = useState(calcRevealHeight());

  /** Handle window scroll event */
  const checkHeaderReveal = (isVisible, updateVisible, isHome, _revealHeight) => {
    if (!isHome) {
      if (!isVisible) {
        updateVisible(true)
      }

      return
    }

    if (isVisible) {
      if (window.scrollY < _revealHeight) {
        updateVisible(false)
      }
    } else {
      if (window.scrollY >= _revealHeight) {
        updateVisible(true)
      }
    }
  }

  const handleHomeClick = () => {
    window.scrollTo(0, 0)
    navigate(NAVIGATION_ROUTES[0], {replace: true})
  }

  /** componentDidMount() / componentDidUpdate() */
  useEffect(() => {
    const scrollCallback = () => checkHeaderReveal(headerVisible, setHeaderVisible, location.pathname === '/', revealHeight)
    const resizeCallback = () => setRevealHeight(calcRevealHeight())

    window.addEventListener('resize', resizeCallback)
    window.addEventListener('scroll', scrollCallback)

    scrollCallback()

    // Component unmount
    return () => {
      window.removeEventListener('resize', resizeCallback)
      window.removeEventListener('scroll', scrollCallback)
    }
  }, [headerVisible, location, revealHeight])

  const projectSelectedAppend = () => {
    return (
      <i style={{color: "var(--color-background-light)"}}>{selectedProjectName && ` | ${selectedProjectName}`}</i>
    )
  }

  return (
    <div className={`header ${headerVisible && 'visible'}`}>
      <div className={`container-home ${headerVisible && 'visible'}`} onClick={handleHomeClick}>
        <div className='icon-home'></div>
      </div>
      <p className={`name ${headerVisible && 'visible'}`}>Harrison Balogh {projectSelectedAppend()}</p>

      <SocialIcons inverseIcons={true} containerStyle={{
          float: 'right',
          margin: '6px 12px'
      }}/>

    </div>
  )
}
