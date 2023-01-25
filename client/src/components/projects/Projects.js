import './projects.css'
import React, { useState, useEffect } from 'react';
import projectData from '../../project_markdown/info.json';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))

function Projects() {

  const navigate = useNavigate();

  /* State Variables */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  /** componentDidMount() / componentDidUpdate() */
  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    // To pick up divider render height
    handleResize()

    return () => window.removeEventListener('resize', () => handleResize());
  })

  /** Update windowHeight state to current window height minus nav bar. */
  const handleResize = _ => setWindowHeight(window.innerHeight - NAV_HEIGHT)

  function handleProjectSelected(name) {
    window.scrollTo(0, 0)
    navigate(`/projects/${name}`, {replace: true})
  }

  function projectListItem(i) {
    let project = projectData.projects[i]
    let backgroundImage = ''
    try {
      backgroundImage = require(`../../project_markdown/${project.name}-icon.png`)
      backgroundImage = backgroundImage.default
    } catch(error) {}

    return (
      <li key={i} onClick={() => handleProjectSelected(project.name)}>
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

  /** Render */
  return (
    <div className="projects">
      <div className="content " style={{minHeight: `${windowHeight}px`}}>
        <ul>
          {projectData.projects.map((_, i) => projectListItem(i))}
        </ul>
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
