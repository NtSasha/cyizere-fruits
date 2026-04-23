import { Leaf, Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: "url('/footer-bg-fruits.png')" }}>
      <div className="footer-overlay"></div>
      <div className="footer-grid-v2">
        {/* Column 1: Brand & Social */}
        <div className="footer-col brand-col">
          <h3 className="footer-title">Cyizere Fruits</h3>
          <p className="footer-desc">
            Delivering the freshest organic fruits straight to your doorstep.
            Healthy living made simple and affordable with locally sourced produce.
          </p>
          <div className="footer-social-icons-v2">
            <a href="#" className="social-icon-circle" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" className="social-icon-circle" aria-label="TikTok"><FaTiktok size={18} /></a>
            <a href="#" className="social-icon-circle" aria-label="Facebook"><FaFacebookF size={18} /></a>
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">Always within Reach</h3>
          <div className="contact-info-list">
            <p>Kigali, Rwanda</p>
            <p className="contact-email">cyizerefruits@gmail.com</p>
            <p className="contact-phone">+250 123 456 789</p>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="footer-col links-col">
          <h3 className="footer-title">Explore More</h3>
          <p className="links-desc">Discover our range of fresh products and learn more about our mission.</p>
          <ul className="footer-quick-links">
            <li><a href="/shop">Shop Now</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Get in Touch</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-v2">
        <p>&copy; {new Date().getFullYear()} Cyizere Fruits. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
