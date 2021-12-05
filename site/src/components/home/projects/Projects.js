import './projects.css'
import React from 'react';
import projectData from '../../../project_markdown/info.json';
import ReactMarkdown from 'react-markdown';

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {     
      projectSelectedIndex: undefined,
      interactiveMode: false,
      windowHeight: window.innerHeight,
      projects: projectData.projects
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    // To pick up divider render height
    this.handleResize()
  }

  handleResize() {
    let h = window.innerHeight - 38; // 38 is header height
    this.setState({windowHeight: h});
  }

  handleProjectSelected(i) {
    if (i >= this.state.projects.length) return 
    this.setState({projectSelectedIndex: i})
    window.scrollTo(0, this.content.offsetTop + this.divider.offsetHeight)
  }

  handleBack() {
    this.setState({projectSelectedIndex: undefined})
  }

  getProjectIndexByName(name) {
    return this.state.projects.findIndex(p => p.name === name)
  }

  handleInteractiveModeToggle() {
    this.setState({interactiveMode: !this.state.interactiveMode})
  }

  projectListItem(i) {
    let project = this.state.projects[i]
    return (
      <li key={project.name} onClick={() => this.handleProjectSelected(i)}>
        <div className='project-header'>
          <p className='project-title'>{project.name || ''}</p>
          <p className='project-lang'>{project.lang || ''}</p>
        </div>
        <div className='project-content'>
          <p className='project-description'>{(project.description || '').substring(0, 120) + "..."}</p>
          <div className='project-arrow'>
            <p>VIEW</p>
          </div>
        </div>
      </li>
    );
  }

  projectList() {
    let { projectSelectedIndex, windowHeight, projects } = this.state;
    if (projectSelectedIndex !== undefined) return null
    return (
      <ul>
        {projects.map((_, i) => this.projectListItem(i))}
      </ul>
    )
  }

  projectSelectedContent() {
    let { windowHeight, projectSelectedIndex, projects, interactiveMode } = this.state;
    let projectSelected = projectSelectedIndex !== undefined ? projects[projectSelectedIndex] : undefined
    if (projectSelected === undefined) return null

    let nextProject = projects[(projectSelectedIndex + 1) % projects.length]
    return (
      <div className='project-selected'>
        <div className='project-selected-header'>

          <p onClick={()=>this.handleBack()} className='back'>Back to <b>Projects</b></p>

          <p className='title'>{projectSelected.name}</p>

          <div className='next-container' onClick={() => this.handleProjectSelected(this.getProjectIndexByName(nextProject.name))}>
            <p className='next'>Next Project</p>
            <p className='subtitle'>{nextProject.name}</p>
          </div>

        </div>

        <a className='project-selected-link' href={projectSelected.link}>{projectSelected.link || ''}</a>

        <div onClick={()=>this.handleInteractiveModeToggle()} className='project-selected-mode-toggle'>
          <p className={!interactiveMode ? '' : 'selected'}>Embedded</p>
          <p className={interactiveMode ? '' : 'selected'}>Readme</p>
        </div>
        <div className='project-selected-frame'>
          {
            interactiveMode 
            ? <iframe title={projectSelected.name} src={`https://harxer.com/projects/${projectSelected.name}`} className='project-selected-iframe' style={{height: `${windowHeight - 156}px`}}/>
            : <div className='project-selected-markdown-container'>
                <ReactMarkdown className='project-selected-markdown' children={projectSelected.readme} />
              </div>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="projects" ref={element => this.content = element}>
        <div className="section-divider" ref={element => this.divider = element}>
          <p>Projects</p>
        </div>
        <div className="content " style={{minHeight: `${this.state.windowHeight}px`}}>
          {/* <div className='sticky-header-projects'>
            <p><i>Select a project...</i></p>
          </div> */}

          {this.projectList()}

          {this.projectSelectedContent()}
        </div>
      </div>
    );
  }
}

export default Projects;
