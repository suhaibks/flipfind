import React from 'react';
import { useTheme } from './Theme';

const Footer = () => {
  return (
    <footer className="site-footer"> 
      <div className="footer-content">
        <div className="social-links">
          <a href="https://x.com/suhaib_ks" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.linkedin.com/in/suhaib-k-s-2ba6a8250" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com/share/15hmHygaD7/" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} FlipFind. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;