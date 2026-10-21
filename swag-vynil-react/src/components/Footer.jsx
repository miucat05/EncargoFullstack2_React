export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <span className="footer-logo">Swag Vynil</span>
          <ul className="footer-categories">
            <li><a href="#">Pop</a></li>
            <li><a href="#">Rock</a></li>
            <li><a href="#">Urbano</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <span>¡Mantente al tanto! Únete a nuestro newsletter</span>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  )
}