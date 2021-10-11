import './App.css';
import Header from './home/Header';
import Content from './home/Content';
import React from 'react';

export default class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize()
  }

  handleResize() {
    this.forceUpdate()
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
        <Header contentSections={contentSections}/>
        <Content ref={element => this.content = element}/>
      </div>
    );
  }
}
