import './App.css';
import Header from './home/Header';
import Content from './home/Content';
import React from 'react';

import projectData from '../project_markdown/info.json';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleProjectSelected = this.handleProjectSelected.bind(this);
    this.state = {
      iProjectSelected: undefined,
      selectedProjectStickyHeaderHtml: null,
      interactiveMode: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize()
  }

  handleResize() {
    this.forceUpdate()
  }


  getProjectIndexByName = name => projectData.projects.findIndex(p => p.name === name)
  handleBack = () => this.handleProjectSelected(undefined)
  handleInteractiveModeToggle = () => this.setState({interactiveMode: !this.state.interactiveMode})
  handleProjectSelected = i => this.setState({iProjectSelected: i, interactiveMode: false})

  getProjectHeaderHtml() {
    let { interactiveMode, iProjectSelected } = this.state
    if (iProjectSelected === undefined) return null

    let projects = projectData.projects;
    let projectSelected = projects[iProjectSelected]
    let nextProject = projects[(iProjectSelected + 1) % projects.length]

    return (
      <div className='project-selected-header'>
        <div className='header-top-row'>
          <p onClick={()=>this.handleBack()} className='back'>Back to <b>Projects</b></p>
          <p className='title'>{projectSelected.name}</p>
          <div className='next-container' onClick={() => this.handleProjectSelected(this.getProjectIndexByName(nextProject.name))}>
            <p className='next'>Next Project</p>
            <p className='subtitle'>{nextProject.name}</p>
          </div>
        </div>

        <a className='project-link' href={projectSelected.link} target="_blank" rel="noopener noreferrer">{projectSelected.link || ''}</a>

        {
          projectSelected.interactive ?
          <div onClick={()=>this.handleInteractiveModeToggle()} className='mode-toggle'>
            <p className={interactiveMode ? 'selected' : ''}>Demo</p>
            <p className={interactiveMode ? '' : 'selected'}>Description</p>
          </div>
          : null
        }
      </div>
    )
  }

  render() {
    let sectionHeights = []
    if (this.content !== undefined) {
      // clientHeight does not include margins or borders
      sectionHeights = [
        this.content.banner.content.clientHeight,
        this.content.about.content.clientHeight,
        this.content.projects.divider.clientHeight,
        this.content.projects.content.clientHeight
      ]
    }

    return (
      <div id="app">
        <Header
          sectionHeights={sectionHeights}
          onProjectSelected={this.handleProjectSelected}
          iProjectSelected={this.state.iProjectSelected}
          selectedProjectStickyHeaderHtml={this.getProjectHeaderHtml()}
        />
        <Content
          ref={element => this.content = element}
          onProjectSelected={this.handleProjectSelected}
          iProjectSelected={this.state.iProjectSelected}
          selectedProjectStickyHeaderHtml={this.getProjectHeaderHtml()}
          interactiveMode={this.state.interactiveMode}
        />
      </div>
    );
  }
}
