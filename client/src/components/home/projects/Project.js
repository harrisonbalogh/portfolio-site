import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import projectData from '../../../project_markdown/info.json';
import { useParams, useNavigate } from 'react-router-dom';

const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))

function Project({
  interactiveMode,
  selectedProjectStickyHeaderHtml
}) {
  /* Route params */
  let { projectId: selectedIndex } = useParams();

  let projects = projectData.projects;
  let projectSelected = selectedIndex !== undefined ? projects[selectedIndex] : undefined
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
              style={{height: `${window.innerHeight - NAV_HEIGHT - 158}px`}}
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

Project.defaultProps = {
  interactiveMode: false
}

Project.propTypes = {
  interactiveMode: PropTypes.bool,
  selectedIndex: PropTypes.number
}

export default Project;
