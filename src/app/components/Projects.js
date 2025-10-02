'use client';

import { useState } from 'react';

const projectsData = [
  {
    title: 'Boston-Town-Platform',
    description: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.',
    tags: ['react', 'nodejs', 'mongodb'],
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 15,
    forks: 3,
    link: '#'
  },
  {
    title: 'Health-Check-API',
    description: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.',
    tags: ['python', 'fastapi', 'docker'],
    language: 'Python',
    languageColor: '#3572A5',
    stars: 8,
    forks: 2,
    link: '#'
  },
  {
    title: 'E-Commerce-Platform',
    description: 'Full-stack e-commerce solution with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.',
    tags: ['react', 'express', 'stripe'],
    language: 'TypeScript',
    languageColor: '#2b7489',
    stars: 12,
    forks: 5,
    link: '#'
  },
  {
    title: 'ML-Recommendation-Engine',
    description: 'Machine learning-based recommendation system using collaborative filtering and deep learning to provide personalized content suggestions.',
    tags: ['tensorflow', 'scikit-learn', 'pandas'],
    language: 'Python',
    languageColor: '#3572A5',
    stars: 22,
    forks: 7,
    link: '#'
  },
  {
    title: 'Real-Time-Chat-App',
    description: 'Created a chat room on a single computer where multiple clients can chat with each other using Socket.io and WebRTC for real-time communication.',
    tags: ['socket.io', 'webrtc', 'nodejs'],
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 10,
    forks: 4,
    link: '#'
  },
  {
    title: 'DevOps-Automation-Tools',
    description: 'Collection of automation scripts and tools for CI/CD pipelines, infrastructure as code, and deployment automation using modern DevOps practices.',
    tags: ['terraform', 'kubernetes', 'github-actions'],
    language: 'Shell',
    languageColor: '#89e051',
    stars: 18,
    forks: 6,
    link: '#'
  }
];

export default function Projects() {
  const [sortBy, setSortBy] = useState('stars');

  const sortedProjects = [...projectsData].sort((a, b) => {
    if (sortBy === 'stars') return b.stars - a.stars;
    if (sortBy === 'updated') return 0;
    return a.title.localeCompare(b.title);
  });

  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <h2>My Projects</h2>
        <p className="projects-subtitle">
          A collection of projects I've been working on. From web applications to 
          open source contributions, here's what keeps me busy.
        </p>
        
        <div className="filter-bar">
          <span className="filter-info">Showing {projectsData.length} repositories</span>
          <select 
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="stars">Sort by: Most Stars</option>
            <option value="updated">Sort by: Recently Updated</option>
            <option value="name">Sort by: Name</option>
          </select>
        </div>

        <div className="projects-grid">
          {sortedProjects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <a href={project.link} className="project-title">{project.title}</a>
                <a href={project.link} className="project-link">🔗</a>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
              <div className="project-footer">
                <div className="project-language">
                  <span className="language-dot" style={{ background: project.languageColor }}></span>
                  <span>{project.language}</span>
                </div>
                <div className="project-stats">
                  <span className="stat">⭐ {project.stars}</span>
                  <span className="stat">🍴 {project.forks}</span>
                </div>
              </div>
              <a href={project.link} className="github-link">
                <span>👁️</span> View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}