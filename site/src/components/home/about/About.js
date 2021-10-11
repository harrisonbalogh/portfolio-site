import React from 'react';
import './about.css'

class About extends React.Component {
  render() {
    return (
      <div className="about" ref={element => this.content = element}>
        <div className='sticky-header-about'>
          <p>Harrison Balogh</p>
        </div>
        <div className="about--container-content">
            <ul className="about--profile-links" id="about--profile-links">
              <li className="github"><a href="https://github.com/harrisonbalogh" target=""><div></div></a></li>
              <li className="facebook"><a href="https://www.facebook.com/harrison.balogh" target=""><div></div></a></li>
              <li className="linkedin"><a href="https://www.linkedin.com/in/harrison-balogh-5907a8117/" target=""><div></div></a></li>
            </ul>
            <p className="about--content-bio">
              University taught software engineer (CS B.S.) with skills in stack
              development (MEAN and LAMP), end-to-end encryption, agile methodology
              with scrum workflow using JIRA, P2P networking, and graphics in numerous
              libraries including: Swing/AWT, ThreeJS, SFML, Cocoa, Unity, SpriteKit.
              Experience with hardware integration and structuring data measurements
              using CGAL. This website presents some of the many projects I've worked on over
              the years.
            </p>
  
            <div className="about--navigator">
              <div id="about--navigator-line-left"></div>
              <ul id="about--navigator-icons">
                <li id="about--navigator-icon-lang"></li>
                <li id="about--navigator-icon-work"></li>
                <li id="about--navigator-icon-educ"></li>
                <li id="about--navigator-icon-tool"></li>
              </ul>
              <div id="about--navigator-line-right"></div>
            </div>
  
            <div className="about--content-section" id="about--content-section-lang">
              <div className="about--content-section-icon icon-lang"></div>
              <p className="about--content-section-title">Programming Languages</p>
            </div>
            <ul className="about--content-section-lang" id="about--content-section-lang-content">
              <li>
                <p className="about--content-section-lang-title">Java</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
              <li>
                <p className="about--content-section-lang-title">Swift</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
              <li>
                <p className="about--content-section-lang-title">JavaScript</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
              <li>
                <p className="about--content-section-lang-title">HTML/CSS</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
              <li>
                <p className="about--content-section-lang-title">C#</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
              <li>
                <p className="about--content-section-lang-title">Python</p>
                <p className="about--content-section-lang-count">Reading projects...</p>
              </li>
            </ul>
  
            <div className="about--content-section" id="about--content-section-work">
              <div className="about--content-section-icon icon-work"></div>
              <p className="about--content-section-title">Developer Experience</p>
            </div>
            <p className="about-content-section-work-header"><b>Software Intern</b> - Tatum Games, LLC  <i>Nov. 2018-Feb. 2019</i></p>
            <p className="about-content-section-work-description">
              Complete sprint tasks listed in PMS on-time with team lead feedback.
              Collaborate with team members on solving any issues that may arise with
              my tasks or team members task. Recommend solutions to team members and team lead.
            </p>
            <p className="about-content-section-work-header"><b>Research Assistant</b> - Cal State Long Beach <i>Mar. 2018-Sep. 2018</i></p>
            <p className="about-content-section-work-description">
              Model autonomous robot coordination in parking garage environment. Coordinate with
              mechanical and architectural teams to design space-efficient structures for the use
              of autonomous automotive storage. Present findings on a weekly basis to research
              board and Dean of Engineering culminating in published paper.
            </p>
            <p className="about-content-section-work-header"><b>Web Developer</b> - Freelancer <i>Mar. 2018-Sep. 2018</i></p>
            <p className="about-content-section-work-description" style={{marginBottom: "44px"}}>
              Build websites for clients as well as perform PHP backend administration and server
              upkeep. Clients include Claudia-Rossini, Emilio-Verdugo-Architect, TheCarriageHouseLA,
              DirectHumanity, FusionDesignLA, Harxer (my portfolio site), et al.
            </p>
  
            <div className="about--content-section" id="about--content-section-educ">
              <div className="about--content-section-icon icon-educ"></div>
              <p className="about--content-section-title">Education</p>
            </div>
            <div className="about--content-section-educ">
              <p className="educ-title">Computer Sience (B.S.)</p>
              <p className="educ-sub">Cal State Long Beach, College of Engineering <i>2018</i></p>
            </div>
  
            <div className="about--content-section"  id="about--content-section-tool">
              <div className="about--content-section-icon icon-tool"></div>
              <p className="about--content-section-title">Tools and Workflow</p>
            </div>
            <ul className="about--content-tool-list">
              <li>Photoshop CS6</li><li>Maya</li><li>Blender</li><li>NodeJS</li>
              <li>SpriteKit</li><li>Unity</li><li>Godot</li><li>GSAP Tween</li>
              <li>JIRA</li><li>WordPress</li><li>Wix</li><li>Git</li><li>MySQL</li>
              <li>MongoDB</li><li>Xcode</li><li>Eclipse</li><li>Visual Studio</li>
              <li>Atom</li><li>NetBeans</li><li>Dreamweaver</li><li>Mac</li>
              <li>Windows</li><li>Ubuntu</li><li>iOS</li>
            </ul>
          </div>
      </div>
    );
  }
}

export default About;