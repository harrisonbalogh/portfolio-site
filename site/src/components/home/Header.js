import './header.css'
import React from 'react';
import { Sections } from '../../javascript/constants';
import projectData from '../../project_markdown/info.json'
import PropTypes from 'prop-types';

const navHeight = 40;
const stickyHeight = 30;

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedTabIndex: 0,
      headerButtonWidths: [],
      stickyHeaderDisplacement: navHeight
    }
  }

  componentDidMount() {
    this.setState({
      headerButtonWidths: [
        this.buttonHome.clientWidth,
        this.buttonAbout.clientWidth,
        this.buttonProjects.clientWidth,
        this.buttonProjects.clientWidth
      ]
    })
    document.addEventListener('scroll', () => this.handleScroll())
  }

  handleScroll() {
    let updateState = false
    let newState = {
      stickyHeaderDisplacement: this.state.stickyHeaderDisplacement,
      focusedTabIndex: this.state.focusedTabIndex
    }
    let heightTotal = 0
    for (let s = 0; s < this.props.contentSections.length; s++) {
      heightTotal += this.props.contentSections[s]
      // Check section
      if (window.scrollY < heightTotal) {
        if (this.state.focusedTabIndex !== s) {
          newState['focusedTabIndex'] = s
          updateState = true
        }
        // Check displacement (unless on last section)
        if (s !== this.props.contentSections.length - 1 && (heightTotal - stickyHeight) < window.scrollY) { // 30 is sticky header height
            newState['stickyHeaderDisplacement'] = navHeight - (window.scrollY - (heightTotal - stickyHeight))
            updateState = true
        } else if (this.state.stickyHeaderDisplacement !== navHeight) {
          newState['stickyHeaderDisplacement'] = navHeight
          updateState = true
        }

        if (updateState) {
          this.setState(newState)
        }
        return
      }
    }
  }

  handleNavSelection(section) {
    let heightTotal = 0;
    if (section === 2) {
      section = 3
      this.props.onProjectSelected(undefined);
    }
    for (let s = 0; s < section; s++) {
      heightTotal += this.props.contentSections[s]
    }
    window.scrollTo(0, heightTotal)
  }

  headerButtons(hightlight = false) {
    return(
      <React.Fragment>
        <p onClick={()=>this.handleNavSelection(0)} className="home" ref={p => {if (!hightlight) this.buttonHome = p}}>HB</p>
        <p onClick={()=>this.handleNavSelection(1)} ref={p => {if (!hightlight) this.buttonAbout = p}}>About</p>
        <p onClick={()=>this.handleNavSelection(2)} ref={p => {if (!hightlight) this.buttonProjects = p}}>Projects</p>
        {this.selectedProjectHeaderButton(hightlight)}
      </React.Fragment>
    )
  }

  /**
   * Conditionally displays selected project header button.
   */
  selectedProjectHeaderButton(hightlight) {
    return (this.props.iProjectSelected && !hightlight ? 
      <p onClick={()=>this.handleNavSelection(3)} className='header-button-selected-project' >
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
    const clipWidth = headerButtonWidths[focusedTabIndex]
    const clipX = headerButtonWidths.slice(0, Math.min(focusedTabIndex, 2)).reduce((x, current) => x + current, 0)
    const clipX2 = clipX + clipWidth

    return (
      <div className="header" ref={element => this.content = element}>
        <div className="nav">
          {this.headerButtons()}
        </div>
        <div className="nav-highlight" id='nav-highlight' 
          style={{ clipPath: `polygon(${clipX}px 0, ${clipX2}px 0,  ${clipX2}px var(--nav-height), ${clipX}px var(--nav-height))`}}>
          {this.headerButtons(true)}
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
  contentSections: []
}

Header.propTypes = {
  contentSections: PropTypes.arrayOf(PropTypes.number),
  iProjectSelected: PropTypes.number
}

export default Header;
