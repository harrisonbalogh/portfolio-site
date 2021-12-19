import './projects.css'
import React from 'react';
import projectData from '../../../project_markdown/info.json';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {     
      interactiveMode: false,
      windowHeight: window.innerHeight,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    // To pick up divider render height
    this.handleResize()
  }

  handleResize() {
    let h = window.innerHeight - 40; // 40 is header height
    this.setState({windowHeight: h});
  }

  handleProjectSelected(i) {
    if (i >= projectData.projects.length) return 
    window.scrollTo(0, this.content.offsetTop + this.divider.offsetHeight)
    this.props.onProjectSelected(i);
    this.setState({interactiveMode: false})
  }

  handleBack() {
    this.props.onProjectSelected(undefined);
  }

  getProjectIndexByName(name) {
    return projectData.projects.findIndex(p => p.name === name)
  }

  handleInteractiveModeToggle() {
    this.setState({interactiveMode: !this.state.interactiveMode})
  }

  projectListItem(i) {
    let project = projectData.projects[i]
    let backgroundImage = ''
    try {
      backgroundImage = require(`../../../project_markdown/${project.name}-icon.png`)
      backgroundImage = backgroundImage.default
    } catch(error) {}
    
    return (
      <li key={project.name} onClick={() => this.handleProjectSelected(i)}>
        <div className='project-header'>
          <p className='project-title'>{project.name || ''}</p>
          <p className='project-lang'>{project.lang || ''}</p>
        </div>
        <div className='project-content' style={{backgroundImage: `url(${backgroundImage})`}}>
          <p className='project-description'>{(project.description || '').substring(0, 120) + "..."}</p>
          <div className='project-arrow'>
            <p>VIEW</p>
          </div>
        </div>
      </li>
    );
  }

  projectList() {
    let { iProjectSelected } = this.props;
    if (iProjectSelected !== undefined) return null
    return (
      <ul>
        {projectData.projects.map((_, i) => this.projectListItem(i))}
      </ul>
    )
  }

  projectSelectedContent() {
    let { windowHeight, interactiveMode } = this.state;
    let { iProjectSelected } = this.props;
    let projects = projectData.projects;
    let projectSelected = iProjectSelected !== undefined ? projects[iProjectSelected] : undefined
    if (projectSelected === undefined) return null

    let nextProject = projects[(iProjectSelected + 1) % projects.length]
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

        <a className='project-selected-link' href={projectSelected.link} target="_blank" rel="noopener noreferrer">{projectSelected.link || ''}</a>

        {
          projectSelected.interactive ?
          <div onClick={()=>this.handleInteractiveModeToggle()} className='project-selected-mode-toggle'>
            <p className={!interactiveMode ? '' : 'selected'}>Demo</p>
            <p className={interactiveMode ? '' : 'selected'}>Description</p>
          </div>
          : null
        }
        <div className='project-selected-frame'>
          {
            interactiveMode 
            ? <iframe title={projectSelected.name} src={`https://harrisonbalogh.com/projects/${projectSelected.name}`} className='project-selected-iframe' style={{height: `${windowHeight - 156}px`}}/>
            : <div className='project-selected-markdown-container'>
                <ReactMarkdown className='project-selected-markdown' 
                components={{
                  img: ({node, ...props}) => <img src={props.src} alt={props.alt} width="500" />
                }}
                rehypePlugins={[rehypeRaw, remarkGfm]}
                children={projectSelected.readme}/>
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
