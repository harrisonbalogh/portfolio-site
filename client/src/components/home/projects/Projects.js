import './projects.css'
import React from 'react';
import projectData from '../../../project_markdown/info.json';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import PropTypes from 'prop-types';

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHeight: window.innerHeight,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    // To pick up divider render height
    this.handleResize()
  }

  handleResize() {
    let h = window.innerHeight - NAV_HEIGHT
    this.setState({windowHeight: h});
  }

  handleProjectSelected(i) {
    if (i >= projectData.projects.length) return
    window.scrollTo(0, this.content.offsetTop + this.divider.offsetHeight)
    this.props.onProjectSelected(i);
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
          <div className='project-arrow'>
            <p>VIEW</p>
          </div>
        </div>
        <p className='project-description'>{(project.description || '').substring(0, 120) + "..."}</p>
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
    let { windowHeight } = this.state;
    let { iProjectSelected, interactiveMode } = this.props;
    let projects = projectData.projects;
    let projectSelected = iProjectSelected !== undefined ? projects[iProjectSelected] : undefined
    if (projectSelected === undefined) return null

    return (
      <div className='project-selected'>
        {this.props.selectedProjectStickyHeaderHtml}

        <div className='project-selected-frame'>
          {
            interactiveMode
            ? <iframe
                title={projectSelected.name}
                src={`https://harrisonbalogh.com/projects/${projectSelected.name}`}
                className='project-selected-iframe'
                style={{height: `${windowHeight - 158}px`}}
              />
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

Projects.defaultProps = {
  interactiveMode: false
}

Projects.propTypes = {
  interactiveMode: PropTypes.bool
}

export default Projects;
