import './home.css'
import React from 'react';

import Banner from '../banner/Banner'
import Projects from '../projects/Projects'

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <Banner/>
        <Projects
          onProjectSelected={this.props.onProjectSelected}
          iProjectSelected={this.props.iProjectSelected}
        />
      </div>
    );
  }
}
