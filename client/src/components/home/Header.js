import './header.css'
import React from 'react';
import HeaderSticky from './HeaderSticky';
import projectData from '../../project_markdown/info.json'
import PropTypes from 'prop-types';

const UNKNOWN = -1

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))

const HEADER_BUTTONS = [
  'HB',
  'About',
  'Projects'
]

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iFocusedSection: 0,
      stickyHeaderDisplacement: NAV_HEIGHT,
      stickyHeight: UNKNOWN // Need a render frame to compute height
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', () => this.computeDisplacement())
  }

  componentDidUpdate() {
    // Check if sticky header height was changed
    if (this.headerSticky && this.state.stickyHeight === UNKNOWN) {
      this.computeDisplacement(this.headerSticky.content.clientHeight)
    }
  }

  /** @param headerStickyHeight {integer} If provided, this value is used for the headerSticky height.  */
  computeDisplacement(headerStickyHeight = undefined) {
    let newState = {}

    // Get currently focused section by compounding section heights. Retain its index
    let heightTotal = 0
    let iSection = 0
    for (let s = 0; s < this.props.sectionHeights.length; s++) {
      heightTotal += this.props.sectionHeights[s]
      if (window.scrollY < heightTotal) break
      iSection++
    }

    // Update focused section and clear recorded sticky height until render occurs to compute new sticky height
    if (this.state.iFocusedSection !== iSection) {
      newState.iFocusedSection = iSection
      // It takes a render frame for style to compute height
      newState.stickyHeight = UNKNOWN
      return this.setState(newState)
    }

    let stickyHeight = headerStickyHeight === undefined ? this.state.stickyHeight : headerStickyHeight
    if (headerStickyHeight !== undefined) {
      newState.stickyHeight = this.headerSticky.content.clientHeight
    }
    if (iSection !== this.props.sectionHeights.length - 1 && (heightTotal - stickyHeight) < window.scrollY) {
      // Displace sticky header with next section
      newState.stickyHeaderDisplacement = NAV_HEIGHT - (window.scrollY - (heightTotal - stickyHeight))
    }
    else if (this.state.stickyHeaderDisplacement !== NAV_HEIGHT) {
      newState.stickyHeaderDisplacement = NAV_HEIGHT
    }

    this.setState(newState)
  }

  handleNavSelection(section) {
    let heightTotal = 0;
    if (section === 2) {
      section = 3
      this.props.onProjectSelected(undefined);
    }
    for (let s = 0; s < section; s++) {
      heightTotal += this.props.sectionHeights[s]
    }
    window.scrollTo(0, heightTotal)
  }

  navButtons(iFocusedSection) {
    return HEADER_BUTTONS.map((name, i) => {
      let className = (i === Math.min(iFocusedSection, HEADER_BUTTONS.length - 1)) ? 'focused' : ''
      return <p key={i} onClick={()=>this.handleNavSelection(i)} className={className}>{name}</p>
    })
  }

  /**
   * Conditionally displays selected project nav button.
   */
  selectedProjectNavButton(highlight) {
    let className = `header-button-selected-project ${highlight ? 'highlight' : ''}`
    return (this.props.iProjectSelected !== undefined ?
      <p onClick={()=>this.handleNavSelection(3)} className={className}>
        {`${projectData.projects[this.props.iProjectSelected].name}`}
      </p>
      : undefined
    )
  }

  render() {
    const { iFocusedSection, stickyHeaderDisplacement} = this.state;

    return (
      <div className="header">
        <div className="nav">
          {this.navButtons(iFocusedSection)}
          {this.selectedProjectNavButton(iFocusedSection >= 3)}
        </div>
        <HeaderSticky ref={e => this.headerSticky = e}
          sectionIndex={iFocusedSection}
          displacement={stickyHeaderDisplacement}
        />
        <div id="header-spacer-fixed-correction"></div>
      </div>
    );
  }
}

Header.defaultProps = {
  sectionHeights: []
}

Header.propTypes = {
  sectionHeights: PropTypes.arrayOf(PropTypes.number),
  iProjectSelected: PropTypes.number
}

export default Header;
