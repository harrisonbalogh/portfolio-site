import './content.css'
import React from 'react';

import Banner from './banner/Banner'
import About from './about/About'
import Projects from './projects/Projects'

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <Banner ref={element => this.banner = element}/>
        <About ref={element => this.about = element}/>
        <Projects ref={element => this.projects = element}
          onProjectSelected={this.props.onProjectSelected}
          iProjectSelected={this.props.iProjectSelected}
          selectedProjectStickyHeaderHtml={this.props.selectedProjectStickyHeaderHtml}
          interactiveMode={this.props.interactiveMode}
        />
      </div>
    );
  }
}
