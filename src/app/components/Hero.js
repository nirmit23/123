export default function Hero() {
    return (
      <section id="home" className="hero">
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
  
        <h1 className="gradient-name">Nirmit Shah</h1>
        <p className="subtitle">
          Software Engineer @ Northeastern University | Full-Stack Developer | Creator
        </p>
  
        <div className="tags-container">
          <div className="tag">
            <span className="tag-icon">💻</span>
            <span>Engineering</span>
          </div>
          <div className="tag">
            <span className="tag-icon">🚀</span>
            <span>Development</span>
          </div>
          <div className="tag">
            <span className="tag-icon">✨</span>
            <span>Creating</span>
          </div>
        </div>
  
        <div>
          <a href="#projects" className="cta-button">
            Explore My Work →
          </a>
        </div>
      </section>
    );
  }
  