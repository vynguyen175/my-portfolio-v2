'use client';

import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (form.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <label
          htmlFor="name"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#000'
          }}
        >
          NAME
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '4px solid #000',
            borderRadius: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            boxSizing: 'border-box',
            boxShadow: errors.name ? '0 0 0 2px #FF6B6B' : '4px 4px 0px rgba(0,0,0,0.2)',
            backgroundColor: '#FFF',
            transition: 'all 0.2s ease'
          }}
        />
        {errors.name && (
          <p style={{
            color: '#FF6B6B',
            fontSize: '12px',
            marginTop: '6px',
            fontWeight: 600
          }}>
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#000'
          }}
        >
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '4px solid #000',
            borderRadius: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            boxSizing: 'border-box',
            boxShadow: errors.email ? '0 0 0 2px #FF6B6B' : '4px 4px 0px rgba(0,0,0,0.2)',
            backgroundColor: '#FFF',
            transition: 'all 0.2s ease'
          }}
        />
        {errors.email && (
          <p style={{
            color: '#FF6B6B',
            fontSize: '12px',
            marginTop: '6px',
            fontWeight: 600
          }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          htmlFor="message"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#000'
          }}
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message here..."
          rows={6}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '4px solid #000',
            borderRadius: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            boxSizing: 'border-box',
            boxShadow: errors.message ? '0 0 0 2px #FF6B6B' : '4px 4px 0px rgba(0,0,0,0.2)',
            backgroundColor: '#FFF',
            transition: 'all 0.2s ease',
            resize: 'none'
          }}
        />
        {errors.message && (
          <p style={{
            color: '#FF6B6B',
            fontSize: '12px',
            marginTop: '6px',
            fontWeight: 600
          }}>
            {errors.message}
          </p>
        )}
        <p style={{
          color: '#999',
          fontSize: '11px',
          marginTop: '6px',
          textAlign: 'right'
        }}>
          {form.message.length}/1000
        </p>
      </div>

      {status === 'error' && (
        <div style={{
          padding: '16px',
          backgroundColor: '#FF6B6B',
          border: '4px solid #000',
          borderRadius: '4px',
          marginBottom: '24px',
          color: '#000',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div style={{
          padding: '16px',
          backgroundColor: '#A8E6CF',
          border: '4px solid #000',
          borderRadius: '4px',
          marginBottom: '24px',
          color: '#000',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          Message sent successfully! 🎉 I'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '16px 24px',
          backgroundColor: status === 'loading' ? '#CCC' : '#FFD700',
          border: '4px solid #000',
          borderRadius: '4px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '16px',
          fontWeight: 900,
          color: '#000',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
          textShadow: '1px 1px 0px rgba(255,255,255,0.4)'
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            const elem = e.currentTarget;
            elem.style.transform = 'translateY(-2px)';
            elem.style.boxShadow = '8px 8px 0px rgba(0,0,0,0.4)';
          }
        }}
        onMouseLeave={(e) => {
          const elem = e.currentTarget;
          elem.style.transform = 'translateY(0)';
          elem.style.boxShadow = '6px 6px 0px rgba(0,0,0,0.3)';
        }}
      >
        {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
}
