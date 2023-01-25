import React from 'react';
import './social-icons.css'

export default function SocialIcons({
  inverseIcons = false,
  containerStyle = {}
}) {
  return (
    <div className="container-social-icons" style={containerStyle}>
      <a href="https://github.com/harrisonbalogh" target="">
        <div className={`github ${inverseIcons && 'inv'}`}></div>
      </a>
      <a href="https://www.linkedin.com/in/harrison-balogh-5907a8117/" target="">
        <div className={`linkedin ${inverseIcons && 'inv'}`}></div>
      </a>
    </div>
  )
}
