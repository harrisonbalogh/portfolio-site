import './header.css'
import React, { useState, useEffect } from 'react';
import HeaderSticky from './HeaderSticky';
import projectData from '../../project_markdown/info.json'
import PropTypes from 'prop-types';

// TODO
import { useNavigate } from "react-router-dom";
// navigate(`/projects/${i}`, {replace: true})

const UNKNOWN = -1

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))

const HEADER_BUTTONS = [
  'HB',
  'About',
  'Projects'
]

function Header({
  onProjectSelected,
  sectionHeights,
  iProjectSelected,
  selectedProjectStickyHeaderHtml
}) {
  const navigate = useNavigate()
  const navigationRoutes = [
    '/',
    '/',
    '/projects'
  ]

  /* State Variables*/
  const [indexFocusedSection, setIndexFocusedSection] = useState(0);
  const [stickyHeaderDisplacement, setStickyHeaderDisplacement] = useState(NAV_HEIGHT);
  const [stickyHeight, setStickyHeight] = useState(UNKNOWN); // Need a render frame to compute height

  /** componentDidMount() / componentDidUpdate() */
  useEffect(() => {
    document.addEventListener('scroll', () => computeDisplacement())
    // Check if sticky header height was changed
    // if (headerSticky && stickyHeight === UNKNOWN) {
    //   computeDisplacement(headerSticky.content.clientHeight)
    // }
  })

  /** @param headerStickyHeight {integer} If provided, this value is used for the headerSticky height.  */
  function computeDisplacement(headerStickyHeight = undefined) {
    let pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    let scrollY = Math.min(window.scrollY, pageHeight - window.innerHeight)

    // Get currently focused section by compounding section heights. Retain its index
    let heightTotal = 0
    let iSection = 0
    for (let s = 0; s < sectionHeights.length; s++) {
      let projectMod = s >= 2 ? 1 : 0
      heightTotal += sectionHeights[s]
      if (scrollY < heightTotal + projectMod) break
      iSection++
    }

    // Update focused section and clear recorded sticky height until render occurs to compute new sticky height
    if (indexFocusedSection !== iSection) {
      setIndexFocusedSection(iSection)
      // It takes a render frame for style to compute height
      setStickyHeight(UNKNOWN)
      // scrollNav(iSection)
      // return setState({stickyHeight: 5})
      setStickyHeight(5) // todo
    }

    setStickyHeight(headerStickyHeight === undefined ? stickyHeight : headerStickyHeight)
    if (headerStickyHeight !== undefined) {
      // setStickyHeight(headerSticky.content.clientHeight)
    }
    if (iSection !== sectionHeights.length - 1 && (heightTotal - stickyHeight) < scrollY) {
      // Displace sticky header with next section
      setStickyHeaderDisplacement(NAV_HEIGHT - (scrollY - (heightTotal - stickyHeight)))
    }
    else if (stickyHeaderDisplacement !== NAV_HEIGHT) {
      setStickyHeaderDisplacement(NAV_HEIGHT)
    }
  }

  // scrollNav(iSection) {
  //   let width = nav.children[Math.min(nav.children.length - 1, iSection)].offsetLeft
  //   nav.scrollTo(width, 0)
  // }

  function handleNavSelection(iSection) {
    // let heightTotal = 0;
    if (iSection === 2) {
      iSection = 3
      onProjectSelected(undefined);
    }
    // for (let s = 0; s < iSection; s++) {
    //   heightTotal += sectionHeights[s]
    // }
    // scrollNav(iSection)
    // window.scrollTo(0, heightTotal)
    navigate(navigationRoutes[Math.min(iSection, 2)], {replace: true})
  }

  function navButtons(indexFocusedSection) {
    return HEADER_BUTTONS.map((name, i) => {
      let className = (i === Math.min(indexFocusedSection, HEADER_BUTTONS.length - 1)) ? 'focused' : ''
      return <p key={i} onClick={()=>handleNavSelection(i)} className={className}>{name}</p>
    })
  }

  /**
   * Conditionally displays selected project nav button.
   */
  function selectedProjectNavButton(highlight) {
    let className = `header-button-selected-project ${highlight ? 'highlight' : ''}`
    return (iProjectSelected !== undefined ?
      <p onClick={()=>handleNavSelection(3)} className={className}>
        {`${projectData.projects[iProjectSelected].name}`}
      </p>
      : undefined
    )
  }

  return (
    <div className="header">
    <div className="nav">
      {navButtons(indexFocusedSection)}
      {selectedProjectNavButton(indexFocusedSection >= 2)}
    </div>
    <HeaderSticky
      sectionIndex={indexFocusedSection}
      displacement={stickyHeaderDisplacement}
      selectedProjectStickyHeaderHtml={selectedProjectStickyHeaderHtml}
    />
    <div id="header-spacer-fixed-correction"></div>
  </div>
  )
}

Header.defaultProps = {
  sectionHeights: []
}

Header.propTypes = {
  sectionHeights: PropTypes.arrayOf(PropTypes.number),
  iProjectSelected: PropTypes.number
}

export default Header;
