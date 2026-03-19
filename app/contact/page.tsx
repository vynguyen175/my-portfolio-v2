'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';
import ContactForm from '@/components/ContactForm';
import AnimatedElement from '@/components/AnimatedElement';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/vynguyen175",
      icon: FaGithub,
      bgColor: "#FF6B6B",
      description: "Check out my projects and code"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vy-nguyen-71629729b/",
      icon: FaLinkedin,
      bgColor: "#4ECDC4",
      description: "Connect with me professionally"
    },
    {
      name: "Email",
      url: "mailto:vyn13217@gmail.com",
      icon: MdEmail,
      bgColor: "#A8E6CF",
      description: "Send me a message"
    }
  ];

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px' }}>
          <div className="content-backdrop">
            {/* Title */}
            <header style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 className="page-title">GET IN TOUCH</h1>
              <p className="page-subtitle">LET&apos;S CONNECT & COLLABORATE</p>
            </header>

            {/* Social Links Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              padding: '0 8px',
              marginBottom: '48px'
            }}>
              {socialLinks.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <AnimatedElement key={social.name} variant="slideUp" delay={idx * 100}>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-card"
                      aria-label={`${social.name} - ${social.description}`}
                      style={{
                        backgroundColor: social.bgColor,
                        color: '#000'
                      }}
                    >
                      <div style={{
                        fontSize: '48px',
                        marginBottom: '12px'
                      }}>
                        <IconComponent size={48} color="#000" />
                      </div>
                      <h3 style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 800,
                        color: '#000',
                        margin: 0,
                        marginBottom: '8px',
                        textShadow: '1px 1px 0px rgba(255,255,255,0.4)'
                      }}>
                        {social.name}
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: '#000',
                        margin: 0,
                        fontWeight: 500,
                        lineHeight: '1.4'
                      }}>
                        {social.description}
                      </p>
                    </Link>
                  </AnimatedElement>
                );
              })}
            </div>

            {/* Contact Form Section */}
            <AnimatedElement variant="slideUp">
              <section
                aria-label="Contact form"
                style={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  paddingBottom: '48px'
                }}
              >
                <h2 style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  color: '#FFD700',
                  marginBottom: '32px',
                  marginLeft: '8px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px'
                }}>
                  SEND ME A MESSAGE
                </h2>

                <div style={{
                  backgroundColor: '#FFF',
                  border: 'clamp(3px, 0.8vw, 6px) solid #000',
                  boxShadow: '5px 5px 0px rgba(0,0,0,0.3)',
                  padding: 'clamp(16px, 3vw, 24px)',
                  borderRadius: '4px'
                }}>
                  <ContactForm />
                </div>
              </section>
            </AnimatedElement>

            {/* Contact Information */}
            <AnimatedElement variant="slideUp">
              <section aria-label="Contact details" style={{ maxWidth: '100%', margin: '0 auto', paddingBottom: '48px' }}>
                <h2 style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  color: '#FFD700',
                  marginBottom: '32px',
                  marginLeft: '8px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px'
                }}>
                  CONTACT DETAILS
                </h2>

                {/* Email Card */}
                <div className="contact-info-card" style={{ animationDelay: '0.4s' }}>
                  <h3 style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#000',
                    margin: 0,
                    marginBottom: '12px',
                    letterSpacing: '0.5px'
                  }}>
                    EMAIL
                  </h3>
                  <Link
                    href="mailto:vyn13217@gmail.com"
                    style={{
                      color: '#FF6B6B',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      borderBottom: '2px solid #FF6B6B',
                      paddingBottom: '2px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    vyn13217@gmail.com
                  </Link>
                </div>

                {/* GitHub Card */}
                <div className="contact-info-card" style={{ animationDelay: '0.5s' }}>
                  <h3 style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#000',
                    margin: 0,
                    marginBottom: '12px',
                    letterSpacing: '0.5px'
                  }}>
                    GITHUB
                  </h3>
                  <Link
                    href="https://github.com/vynguyen175"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#4ECDC4',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      borderBottom: '2px solid #4ECDC4',
                      paddingBottom: '2px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    github.com/vynguyen175
                  </Link>
                </div>

                {/* LinkedIn Card */}
                <div className="contact-info-card" style={{ animationDelay: '0.6s' }}>
                  <h3 style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#000',
                    margin: 0,
                    marginBottom: '12px',
                    letterSpacing: '0.5px'
                  }}>
                    LINKEDIN
                  </h3>
                  <Link
                    href="https://www.linkedin.com/in/vy-nguyen-71629729b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#333',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      borderBottom: '2px solid #333',
                      paddingBottom: '2px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    linkedin.com/in/vy-nguyen
                  </Link>
                </div>

                {/* Collaboration Card */}
                <div
                  className="contact-info-card"
                  style={{
                    backgroundColor: '#FFD3B6',
                    animationDelay: '0.7s',
                    minHeight: 'auto'
                  }}
                >
                  <h3 style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#000',
                    margin: 0,
                    marginBottom: '12px',
                    textShadow: '1px 1px 0px rgba(255,255,255,0.4)'
                  }}>
                    LET&apos;S COLLABORATE!
                  </h3>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '13px',
                    color: '#000',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: 500
                  }}>
                    I&apos;m seeking opportunities to build impactful products and grow with a great team. Whether you need a developer to contribute from day one or want to collaborate on a project, I&apos;d love to connect.
                  </p>
                </div>
              </section>
            </AnimatedElement>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              padding: '48px 16px',
            }}>
              <span className="section-footer">
                LOOKING FORWARD TO HEARING FROM YOU
              </span>
            </div>
          </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
