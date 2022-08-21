import './headerSticky.css'
import React from 'react';
import PropTypes from 'prop-types';

/** Sticky header HTML for each section */
let STICKY_CONTENT = [
  null,
  <p>Harrison Balogh</p>,
  null,
  <p>Select a project...</p>
]

/** See headerSticky.css for styling of each sticky-header section */
const STICKY_CLASS_NAME = [
  "hidden",
  "about",
  "hidden",
  "projects"
]

class HeaderSticky extends React.Component {
  constructor(props) {
    super(props)
  }

  /** Get header sticky content by section index.
   * @param i {integer} Section index in STICKY_CONTENT
   * @returns Sticky content HTML from STICKY_CONTENT
   */
  getStickyContent = i => STICKY_CONTENT[Math.min(i, STICKY_CONTENT.length - 1)]

  /** Get header sticky class name by section index.
   * @param i {integer} Section index in STICKY_CLASS_NAME
   * @returns Sticky content class name from STICKY_CLASS_NAME
   */
  getStickyClassName = i => `sticky-header ${STICKY_CLASS_NAME[Math.min(i, STICKY_CLASS_NAME.length - 1)]}`

  render() {
    const { sectionIndex, displacement} = this.props;
    let stickyHeaderOffset = `${displacement}px`

    STICKY_CONTENT[3] = this.props.selectedProjectStickyHeaderHtml

    return (
      <div ref={e => this.content = e}
        className={this.getStickyClassName(sectionIndex)}
        style={{marginTop: stickyHeaderOffset}}
      >
        {this.getStickyContent(sectionIndex)}
      </div>
    );
  }
}

HeaderSticky.defaultProps = {
  sectionIndex: 0,
  displacement: 0
}

HeaderSticky.propTypes = {
  sectionIndex: PropTypes.number,
  displacement: PropTypes.number
}

export default HeaderSticky;
