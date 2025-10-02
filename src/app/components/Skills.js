const skillsData = [
    {
      icon: '🌐',
      title: 'Frontend Development',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Angular']
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      items: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot', 'REST APIs', 'GraphQL']
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      items: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Kotlin', 'Swift']
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      items: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions']
    },
    {
      icon: '💻',
      title: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'SQL']
    },
    {
      icon: '🔧',
      title: 'Tools & Technologies',
      items: ['VS Code', 'IntelliJ IDEA', 'Postman', 'Figma', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase']
    }
  ];
  
  export default function Skills() {
    return (
      <section id="skills" className="skills">
        <div className="section-container">
          <h2>Skills & Technologies</h2>
          <p className="skills-subtitle">
            A comprehensive overview of the technologies, languages, and tools I 
            work with to build amazing software experiences.
          </p>
  
          <div className="skills-grid">
            {skillsData.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="skill-header">
                  <span className="skill-icon">{category.icon}</span>
                  <h3 className="skill-title">{category.title}</h3>
                </div>
                <div className="skill-items">
                  {category.items.map((item, i) => (
                    <span key={i} className="skill-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
  
          <div className="learning-section">
            <h3>Always Learning</h3>
            <p>
              Technology evolves rapidly, and I'm committed to continuous learning. I regularly 
              explore new frameworks, tools, and best practices to stay current with industry 
              trends and deliver cutting-edge solutions.
            </p>
          </div>
        </div>
      </section>
    );
  }