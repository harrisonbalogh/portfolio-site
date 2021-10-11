// import '../../stylesheets/Header.css'
import './projects.css'
import React from 'react';
// import projectTestPath from '../../../project_markdown/test-project-1/readme.md';
// import ReactMarkdown from 'react-markdown';

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {     
      projectSelected: undefined,
      interactiveMode: false,
      windowHeight: window.innerHeight,
      markdownTest: ''
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    // To pick up divider render height
    this.handleResize()

    // fetch(projectTestPath)
    //   .then(response => {
    //     return response.text()
    //   })
    //   .then(text => {
    //     this.setState({
    //       markdownTest: text
    //     })
    //   })
  }

  handleResize() {
    let h = window.innerHeight - 38; // 38 is header height
    this.setState({windowHeight: h});
  }

  handleProjectSelect(p) {
    this.setState({projectSelected: p})
    window.scrollTo(0, this.content.offsetTop + this.divider.offsetHeight)
  }

  handleBack() {
    this.setState({projectSelected: undefined})
  }

  handleInteractiveModeToggle() {
    this.setState({interactiveMode: !this.state.interactiveMode})
  }

  projectSelectedContent(interactive) {
    if (interactive) {
      return (
        <iframe/>
      )
    }
    return (
      <div>
        
      </div>
    )
  }

  render() {
    let { projectSelected, interactiveMode, windowHeight } = this.state;
    return (
      <div className="projects" ref={element => this.content = element}>
        {/* <ReactMarkdown children={markdownTest} /> */}
        <div className="section-divider" ref={element => this.divider = element}>
          <p>Projects</p>
        </div>
          
        <div className="content ">
          <div className='sticky-header-projects'>
            <p><i>Select a project...</i></p>
          </div>

          <ul className={projectSelected ? 'collapse' : ''} style={{minHeight: `${windowHeight - 43}px`}}>
            <li onClick={() => this.handleProjectSelect(5)}>
              <div className='project-header'>
                <p className='project-title'>Unreal Testing</p>
                <p className='project-lang'>UE4</p>
              </div>
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine. Testing in unreal engine. Testing in unreal engine. 
                  Testing in unreal engine. Testing in unreal engine. Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
            <li>
              <div className='project-header'>
                <p className='project-title'>Triangulation</p>
                <p className='project-lang'>Javascript | CSS</p>
              </div>
              
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
            <li>
              <div className='project-header'>
                <p className='project-title'>Work it</p>
                <p className='project-lang'>Java</p>
              </div>
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine. sdf sdf sdf s a  Testing in unreal engine. Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
            <li>
              <div className='project-header'>
                <p className='project-title'>Something here</p>
                <p className='project-lang'>Javascript</p>
              </div>
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine. as asdf sdf sdf a Testing in unreal engine. Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
            <li>
              <div className='project-header'>
                <p className='project-title'>Another One Here</p>
                <p className='project-lang'>Java</p>
              </div>
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine. a af sdf Testing in unreal engine. Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
            <li>
              <div className='project-header'>
                <p className='project-title'>Test This Here</p>
                <p className='project-lang'>Javascript | Python</p>
              </div>
              <div className='project-content'>
                <p className='project-description'>
                  Testing in unreal engine. Testing in unreal engine. Testing in unreal engine.
                </p>
                <div className='project-arrow'>
                  <p>View</p>
                </div>
              </div>
            </li>
          </ul>

          <div className={projectSelected ? 'project-selected' : 'project-selected collapse'}>
            <div className='project-selected-header'>
              <p onClick={()=>this.handleBack()} className='back'>Back to <b>Projects</b></p>
              <p className='title'>Triangulation</p>
              <div className='next-container'>
                <p className='next'>Next Project</p>
                <p className='subtitle'>Unreal Engine</p>
              </div>
            </div>

            <div onClick={()=>this.handleInteractiveModeToggle()} className='project-selected-mode-toggle'>
              <p className={!interactiveMode ? '' : 'selected'}>Interactive</p>
              <p className={interactiveMode ? '' : 'selected'}>Demo</p>
            </div>
            <div className='project-selected-frame' style={{height: `${windowHeight - 149}px`}}>
              {this.projectSelectedContent(interactiveMode)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
