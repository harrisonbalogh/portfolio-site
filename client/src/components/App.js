import './App.css';
import Header from './home/Header';
import Content from './home/Content';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleProjectSelected = this.handleProjectSelected.bind(this);
    this.state = {     
      iProjectSelected: undefined
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize()
  }

  handleResize() {
    this.forceUpdate()
  }

  handleProjectSelected(i) {
    this.setState({iProjectSelected: i})
  }

  render() {
    let contentSections = []
    if (this.content !== undefined) {
      // clientHeight does not include margins or borders
      contentSections = [
        this.content.banner.content.clientHeight,
        this.content.about.content.clientHeight,
        this.content.projects.divider.clientHeight,
        this.content.projects.content.clientHeight
      ]
    }

    return (
      <div id="app">
        <Header 
          contentSections={contentSections} 
          onProjectSelected={this.handleProjectSelected}
          iProjectSelected={this.state.iProjectSelected}
        />
        <Content 
          ref={element => this.content = element} 
          onProjectSelected={this.handleProjectSelected}
          iProjectSelected={this.state.iProjectSelected}
        />
      </div>
    );
  }
}
