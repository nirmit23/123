'use client';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const isCollab = formData.get('collab') === 'on';
    
    const subject = isCollab ? 'Brand Collaboration Inquiry' : 'Contact from Portfolio';
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = `mailto:nirmitshah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <h2>Let's Connect</h2>
        <p className="contact-subtitle">
          Have a project idea? Want to chat about tech? Interested in brand 
          collaborations? Or just say hi? I'd love to hear from you!
        </p>

        <div className="contact-container">
          <div className="contact-left">
            <h3>
              <span style={{ color: 'var(--primary-blue)' }}>💬</span>
              Get in Touch
            </h3>
            <p>
              I'm always excited to connect with fellow creators, 
              developers, brands, and curious minds. Choose your 
              preferred way to reach out!
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-icon">📧</span>
                <div className="method-content">
                  <h4>Email</h4>
                  <p>Drop me a line anytime</p>
                  <a href="mailto:nirmitshah@gmail.com">nirmitshah@gmail.com</a>
                </div>
              </div>

              <div className="contact-method">
                <span className="method-icon">☕</span>
                <div className="method-content">
                  <h4>Coffee Chat</h4>
                  <p>Let's grab virtual coffee</p>
                  <a href="#">Schedule a call</a>
                </div>
              </div>

              <div className="contact-method">
                <span className="method-icon">🤝</span>
                <div className="method-content">
                  <h4>Brand Collaborations</h4>
                  <p>Partnership opportunities</p>
                  <a href="#">Let's collaborate</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3 className="form-title">
              <span style={{ color: 'var(--primary-blue)' }}>✉️</span>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="collab" name="collab" />
                <label htmlFor="collab">This is regarding a brand collaboration</label>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  placeholder="Tell me about your project, question, collaboration idea, or just say hello!"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message ✈️</button>
            </form>

            <p className="form-footer">
              This will open your email client with the message pre-filled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}