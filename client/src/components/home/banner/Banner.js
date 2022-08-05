import './banner.css'
import React from 'react';

export default class Banner extends React.Component {
  constructor(props) {
    super(props)

    let h = window.innerHeight - 176;

    this.state = { bannerHeight: Math.max(h, 240), nameLabelSticky: false, nameLabelSize: 54 }
  }

  handleResize() {
    let h = window.innerHeight - 176;
    this.setState({bannerHeight: Math.max(h, 240)});
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
  }

  render() {
    const { bannerHeight } = this.state;
    return (
      <div className="banner" ref={element => this.content = element}
        style={{height: `${bannerHeight/2 + 50}px`, paddingTop: `${bannerHeight/2 - 50}px`}}
      >
          <p className="prefix">A</p>
          <h1 ref={element => this.titleLabel = element} className="title">Software Engineer</h1>
          <p className="suffix">Portfolio</p>
          <h1 className="name">Harrison Balogh</h1>
      </div>
    );
  }
}
