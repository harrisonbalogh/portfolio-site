// import '../../stylesheets/Header.css'
import './contact.css'
import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div className="contact" ref={element => this.content = element}>
        <p>Contact!</p>
      </div>
    );
  }
}

export default Contact;