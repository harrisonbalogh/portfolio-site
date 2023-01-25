import './project.css'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import PROJECTS_INFO from '../../project_markdown/info.json';
import { useParams, useNavigate, useSearchParams  } from 'react-router-dom';

const HEADER_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
const FOOTER_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-height'))

function Project() {
  const navigate = useNavigate()

  /* Route params */
  let { projectName: selectedProjectName } = useParams();
  const [searchParams] = useSearchParams();

  /* State Variables */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const loadDemo = (searchParams.get("demo") === '')

  /** componentDidMount() / componentDidUpdate() */
  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    // To pick up divider render height
    handleResize()

    return () => window.removeEventListener('resize', () => handleResize());
  })

  /** Update windowHeight state to current window height minus nav bar. */
  const handleResize = _ => setWindowHeight(window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT)

  let selectedIndex = PROJECTS_INFO.projects.findIndex(p => p.name === selectedProjectName)
  let projectData = PROJECTS_INFO.projects[selectedIndex];
  let backgroundImage = ''
  try {
    backgroundImage = require(`../../project_markdown/${projectData.name}-icon.png`)
    backgroundImage = backgroundImage.default
  } catch(error) {}

  let nextProjectId = (selectedIndex + 1) % PROJECTS_INFO.projects.length
  let nextProjectName = PROJECTS_INFO.projects[nextProjectId].name

  /** Gets iframe if demo requested. Else request button */
  const demoComponent = () => {
    if (loadDemo) {
      return (
        <iframe
          className='interactive-iframe'
          title={projectData.name}
          src={`https://harrisonbalogh.com/demo/${projectData.name}`}
          style={{height: `${windowHeight - 84 - windowHeight/6}px`}}
        />
      )
    }

    return (
      <div className='load-demo-container' style={{height: `${windowHeight/6}px`}}>
        <div className='placeholder-demo-image' style={{backgroundImage: `url(${backgroundImage})`}}></div>
        <p onClick={() => navigate(`/projects/${projectData.name}?demo`, {replace: true})}>Load Demo</p>
      </div>
    )
  }

  return (
    <div className='project-container' style={{minHeight: `${windowHeight}px`}}>

      <h1 className='title'>{projectData.name}</h1>
      <a className='git-link' href={projectData.link} target="_blank" rel="noopener noreferrer">{projectData.link}</a>

      <div className='next-container' onClick={() => navigate(`/projects/${nextProjectName}`, {replace: true})}>
        <p className='next'>Next Project</p>
        <p className='subtitle'>{nextProjectName}</p>
      </div>

      { projectData.interactive &&
        <div className='interactive-container'>
          {demoComponent()}
        </div>
      }

      <div className='markdown-container'>
        <ReactMarkdown className='markdown'
          components={{
            img: ({node, ...props}) => <img src={props.src} alt={props.alt} width="500" />
          }}
          rehypePlugins={[rehypeRaw, remarkGfm]}
          children={projectData.readme}
        />
      </div>

      <div style={{height: '40px'}}></div>
    </div>
  )
}

Project.defaultProps = {
  interactiveMode: false
}

Project.propTypes = {
  interactiveMode: PropTypes.bool,
  selectedIndex: PropTypes.number
}

export default Project;
