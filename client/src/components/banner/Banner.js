import './banner.css'
import React from 'react';
import SocialIcons from '../contact/SocialIcons'

const NAME_FONT_SIZE_MIN = 18;
const NAME_FONT_SIZE_MAX = 52;

export default class Banner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bannerHeight: this.getBannerHeight(),
      nameLabelSticky: false,
      titleOffset: 0,
      nameFontSize: NAME_FONT_SIZE_MAX
    }
  }

  getBannerHeight = () => Math.max(window.innerHeight / 2, 240)

  handleResize = () => {
    this.setState({bannerHeight: this.getBannerHeight()})
  }

  handleScroll = () => {
    const NAME_TARGET_OFFSET = -30
    let bannerHeight = this.getBannerHeight()
    const nameFontSize = (1 - Math.min(window.scrollY / (bannerHeight / 2), 1)) * (NAME_FONT_SIZE_MAX - NAME_FONT_SIZE_MIN) + NAME_FONT_SIZE_MIN
    this.setState({titleOffset: Math.min(window.scrollY, bannerHeight + NAME_TARGET_OFFSET), nameFontSize})
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
  }

  render() {
    const { bannerHeight, titleOffset, nameFontSize } = this.state;



    return (
      <div className="banner" ref={element => this.content = element}
        style={{height: `${bannerHeight/2 + 50}px`, paddingTop: `${bannerHeight/2 - 50}px`}}
      >
          <SocialIcons containerStyle={{
              position: 'absolute',
              top: '0',
              right: '0',
              margin: '12px'
          }}/>

          <div id="banner-title" style={{transform: `translateY(-${titleOffset}px)`}}>
            <p className="prefix">A</p>
            <h1 ref={element => this.titleLabel = element} className="title">Software Engineer</h1>
            <p className="suffix">Portfolio</p>
          </div>

          <h1 className="name" style={{
            transform: `translateY(${titleOffset}px)`,
            fontSize: `${nameFontSize}px`
            }}>Harrison Balogh</h1>
      </div>
    );
  }
}
