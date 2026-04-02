'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FF8C42 0%, #FF6B6B 50%, #E55B5B 100%)',
        padding: '120px 40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,201,70,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Floating Mario */}
      <motion.div
        style={{
          y: marioY,
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          zIndex: 5,
          opacity: 0.2,
        }}
      >
        <img
          src="/sprites/mario-confused.png"
          alt=""
          style={{
            width: 160,
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))',
          }}
        />
      </motion.div>

      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <ScrollReveal>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
                letterSpacing: 0.5,
              }}
            >
              Contact
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.1,
                margin: '0 0 16px',
                letterSpacing: -1,
                textShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              Let&apos;s work{' '}
              <span
                style={{
                  color: '#F0C946',
                  textShadow: '0 4px 20px rgba(240,201,70,0.3)',
                }}
              >
                together
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                maxWidth: 480,
                margin: '0 auto 20px',
              }}
            >
              Have a project in mind, a question, or just want to say hi? Drop me
              a message and I&apos;ll get back to you soon.
            </p>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={0.3}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 40,
              }}
            >
              {[
                { icon: FaGithub, href: 'https://github.com/vynguyen175', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vy-nguyen-71629729b/', label: 'LinkedIn' },
                { icon: MdEmail, href: 'mailto:vyn13217@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form Card */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '40px 36px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.5}>
          <div
            style={{
              textAlign: 'center',
              marginTop: 60,
              paddingTop: 30,
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 500,
              }}
            >
              Designed & built by Vy Nguyen. Powered by Next.js & Framer Motion.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 80px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
