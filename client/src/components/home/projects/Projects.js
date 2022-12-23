import './projects.css'
import React, { useState, useEffect } from 'react';
import projectData from '../../../project_markdown/info.json';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))

function Projects({
  iProjectSelected,
  interactiveMode,
  selectedProjectStickyHeaderHtml,
  onProjectSelected
}) {

  const navigate = useNavigate();

  /* State Variables */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  /** componentDidMount() / componentDidUpdate() */
  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    // To pick up divider render height
    handleResize()
  })

  /** Update windowHeight state to current window height minus nav bar. */
  const handleResize = _ => setWindowHeight(window.innerHeight - NAV_HEIGHT)

  function handleProjectSelected(i) {
    if (i >= projectData.projects.length) return
    // window.scrollTo(0, this.content.offsetTop + this.divider.offsetHeight) // TODO
    // onProjectSelected(i);
    // TODO
    // <Link to={`projects/1`}>Your Name</Link>
    navigate(`/projects/${i}`, {replace: true})
  }

  function projectListItem(i) {
    let project = projectData.projects[i]
    let backgroundImage = ''
    try {
      backgroundImage = require(`../../../project_markdown/${project.name}-icon.png`)
      backgroundImage = backgroundImage.default
    } catch(error) {}

    return (
      <li key={i} onClick={() => handleProjectSelected(i)}>
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

  function projectList() {
    if (iProjectSelected !== undefined) return null
    return (
      <ul>
        {projectData.projects.map((_, i) => projectListItem(i))}
      </ul>
    )
  }

  function projectSelectedContent() {
    let projects = projectData.projects;
    let projectSelected = iProjectSelected !== undefined ? projects[iProjectSelected] : undefined
    if (projectSelected === undefined) return null

    return (
      <div className='project-selected'>
        {selectedProjectStickyHeaderHtml}

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

  /** Render */
  return (
    <div className="projects">
      <div className="section-divider">
        {/* <p>Projects</p> */}
      </div>
      <div className="content " style={{minHeight: `${windowHeight}px`}}>
        {/* <div className='sticky-header-projects'>
          <p><i>Select a project...</i></p>
        </div> */}

        {projectList()}

        {projectSelectedContent()}
      </div>
    </div>
  );
}

Projects.defaultProps = {
  interactiveMode: false
}

Projects.propTypes = {
  interactiveMode: PropTypes.bool,
  iProjectSelected: PropTypes.number
}

export default Projects;
