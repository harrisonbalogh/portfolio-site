import './header.css'
import React from 'react';
import { Sections } from '../../javascript/constants';
import projectData from '../../project_markdown/info.json'
import PropTypes from 'prop-types';

const navHeight = 40;
const stickyHeight = 30;

const HEADER_BUTTONS = [
  'HB',
  'About',
  'Projects'
]

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedTabIndex: 0,
      headerButtonWidths: [],
      stickyHeaderDisplacement: navHeight
    }
    this.navButtonMap = {}
  }

  componentDidMount() {
    document.addEventListener('scroll', () => this.handleScroll())
  }

  handleScroll() {
    let updateState = false
    let newState = {
      stickyHeaderDisplacement: this.state.stickyHeaderDisplacement,
      focusedTabIndex: this.state.focusedTabIndex
    }
    let heightTotal = 0
    let sectionIndex = 0
    for (let s = 0; s < this.props.sectionHeights.length; s++) {
      heightTotal += this.props.sectionHeights[s]
      if (window.scrollY < heightTotal) break
      sectionIndex++
    }

    // Check section
    if (this.state.focusedTabIndex !== sectionIndex) {
      newState['focusedTabIndex'] = sectionIndex
      updateState = true

      Object.keys(this.navButtonMap).forEach(i => (this.navButtonMap[i].className = ""))
      this.navButtonMap[Math.min(sectionIndex, Object.keys(this.navButtonMap).length - 1)].className = "focused"
    }
    // Check displacement (unless on last section)
    if (sectionIndex !== this.props.sectionHeights.length - 1 && (heightTotal - stickyHeight) < window.scrollY) { // 30 is sticky header height
        newState['stickyHeaderDisplacement'] = navHeight - (window.scrollY - (heightTotal - stickyHeight))
        updateState = true
    } else if (this.state.stickyHeaderDisplacement !== navHeight) {
      newState['stickyHeaderDisplacement'] = navHeight
      updateState = true
    }

    if (updateState) {
      this.setState(newState)
    }
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

  navButtons() {
    return HEADER_BUTTONS.map((name, i) => {
      let className = i ? '' : 'focused'
      return <p key={i} onClick={()=>this.handleNavSelection(i)} className={className} ref={p => (this.navButtonMap[i] = p)}>
        {name}
      </p>
    })
  }

  /**
   * Conditionally displays selected project header button.
   */
  selectedProjectHeaderButton(highlight) {
    let className = `header-button-selected-project ${highlight ? 'highlight' : ''}`
    return (this.props.iProjectSelected !== undefined ?
      <p onClick={()=>this.handleNavSelection(3)} className={className}>
        {`${projectData.projects[this.props.iProjectSelected].name}`}
      </p>
      : undefined
    )
  }

  headerStickyContent(section) {
    let sectionContents = [
      <p></p>,
      <p>Harrison Balogh</p>,
      <p>Divider</p>,
      <p><i style={{color: 'gray'}}>Select a project...</i></p>
    ]
    section = Math.min(section, sectionContents.length - 1)
    return sectionContents[section]
  }

  headerStickyClassName(section) {
    section = Math.min(section, Sections.BY_NAME.length - 1)
    return `nav-detail ${Sections.BY_NAME[section]}`
  }

  render() {
    const { focusedTabIndex, headerButtonWidths, stickyHeaderDisplacement} = this.state;
    let stickyHeaderOffset = `${stickyHeaderDisplacement}px`

    return (
      <div className="header" ref={element => this.content = element}>
        <div className="nav">
          {this.navButtons()}
          {this.selectedProjectHeaderButton(focusedTabIndex >= 3)}
        </div>
        <div className={this.headerStickyClassName(focusedTabIndex)} style={{marginTop: stickyHeaderOffset}}>
          {this.headerStickyContent(focusedTabIndex)}
        </div>
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
