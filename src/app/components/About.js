export default function About() {
    return (
      <section className="about">
        <div className="section-container">
          <div className="about-content">
            <div className="about-left">
              <h2>Hey there! 👋</h2>
              <p>
                I'm a passionate software engineer pursuing my Master's in Computer Software Engineering at Northeastern University. 
                With experience at companies like <strong>Enlabel Global Services Inc.</strong>, <strong>Finalyca Technologies</strong>, and <strong>Shaalastic</strong>, 
                I've progressed from intern to senior engineer roles.
              </p>
              <p>
                I love building products that impact millions of users. When I'm not coding, you'll find me exploring new technologies, 
                working on side projects, and sharing knowledge with the developer community.
              </p>
              <a href="#contact" className="connect-btn">
                Let's Connect →
              </a>
            </div>
            <div className="about-right">
              <div className="circle-card">
                <div className="circle-icon">👨‍💻</div>
                <h3>Always Building</h3>
                <p>Creating solutions that matter</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  