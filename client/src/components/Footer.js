import './footer.css'

function Footer() {
  return (
    <div className="footer">
      <p className="back-to-top" onClick={_ => window.scrollTo(0, 0)}>Back to top</p>
      <p>All rights reserved - 2023</p>
    </div>
  );
}

export default Footer;