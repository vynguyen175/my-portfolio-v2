'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

const COMMANDS: Record<string, { output: string; action?: string }> = {
  help: {
    output: `Available commands:
  about      - Who I am
  skills     - My tech stack
  projects   - What I've built
  experience - Work experience
  contact    - How to reach me
  resume     - Download my resume
  game       - Play the Mario game
  github     - Open my GitHub
  linkedin   - Open my LinkedIn
  clear      - Clear terminal
  secret     - ???`,
  },
  about: {
    output: `Vy Nguyen — Full-Stack Developer based in Toronto.

3 years building web apps, AI tools, and cross-platform
products. AWS Certified Cloud Practitioner. George Brown
College — Dean's List, GPA 3.7.

I believe the best code solves real problems for real people.`,
    action: '/about',
  },
  skills: {
    output: `Frontend:  React, Next.js, TypeScript, Tailwind CSS
Backend:   Node.js, Python, C#, Express, REST APIs
Database:  PostgreSQL, MongoDB, SQL Server
Cloud:     AWS, Docker, Vercel
AI/ML:     Pandas, Scikit-learn, Streamlit, TensorFlow
Mobile:    Android (Java), React Native`,
    action: '/skills',
  },
  projects: {
    output: `[1] Sushi Rock      — Production restaurant site (Next.js)
[2] Gameboxd        — Social gaming platform (Web + Android)
[3] Smart Inventory — Inventory system (ASP.NET Core)
[4] Vizion          — AI data visualization (Python/ML)
[5] ÉVO             — Luxury e-commerce (Next.js)
[6] Netflix Engine  — ML recommendation system
[7] Gomoku          — AI board game (Minimax)

Type "projects" + Enter to view all →`,
    action: '/projects',
  },
  experience: {
    output: `Freelance Developer — Sushi Rock (2024)
  Built production website for a Toronto restaurant.
  Online ordering, reservations, multi-location support.

Microsoft Hackathon — Team Lead (2025)
  Led team of 4. Top 10 out of 50 teams.

Open Source — Next.js (vercel/next.js)
  Bug fixes and documentation contributions.

IEEEXtreme 19.0 — 24hr programming competition (2025)`,
    action: '/about',
  },
  contact: {
    output: `Email:    vyn13217@gmail.com
GitHub:   github.com/vynguyen175
LinkedIn: linkedin.com/in/vy-nguyen-71629729b

Or use the contact form →`,
    action: '/contact',
  },
  resume: {
    output: 'Opening resume...',
    action: '/resume.pdf',
  },
  game: {
    output: 'Loading Mario game...',
    action: '/play',
  },
  github: {
    output: 'Opening GitHub...',
    action: 'https://github.com/vynguyen175',
  },
  linkedin: {
    output: 'Opening LinkedIn...',
    action: 'https://www.linkedin.com/in/vy-nguyen-71629729b/',
  },
  secret: {
    output: `You found it. Try the Konami Code:
↑ ↑ ↓ ↓ ← → ← → B A

...or type "hire me" ;)`,
  },
  'hire me': {
    output: `Great choice. Here's why:

✓ 7+ deployed production applications
✓ AWS Certified Cloud Practitioner
✓ Microsoft Hackathon top 10 (team lead)
✓ Open source contributor (Next.js)
✓ Full-stack: React to Python ML pipelines
✓ Built a real client website (Sushi Rock)
✓ 3.7 GPA, Dean's List

Let's talk → vyn13217@gmail.com`,
  },
  clear: {
    output: '__CLEAR__',
  },
};

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to Vy\'s portfolio. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: trimmed },
    ];

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmd = COMMANDS[trimmed];
    if (cmd) {
      if (cmd.output === '__CLEAR__') {
        setLines([{ type: 'output', text: 'Terminal cleared. Type "help" for commands.' }]);
        setInput('');
        return;
      }
      newLines.push({ type: 'output', text: cmd.output });

      if (cmd.action) {
        setTimeout(() => {
          if (cmd.action!.startsWith('http')) {
            window.open(cmd.action, '_blank');
          } else {
            router.push(cmd.action!);
          }
        }, 800);
      }
    } else {
      newLines.push({
        type: 'output',
        text: `Command not found: "${trimmed}". Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: 'rgba(2, 6, 16, 0.9)',
        border: '1px solid rgba(240, 201, 70, 0.15)',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-mono), "Courier New", monospace',
        fontSize: '13px',
        cursor: 'text',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }} />
        </div>
        <span style={{ color: '#64748B', fontSize: '12px', marginLeft: '8px' }}>
          vy@portfolio ~ $
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        style={{
          padding: '14px',
          maxHeight: '280px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{
            marginBottom: '6px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.5,
          }}>
            {line.type === 'input' ? (
              <span>
                <span style={{ color: '#F0C946' }}>$ </span>
                <span style={{ color: '#F1F5F9' }}>{line.text}</span>
              </span>
            ) : (
              <span style={{ color: '#94A3B8' }}>{line.text}</span>
            )}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#F0C946', marginRight: '6px' }}>$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#F1F5F9',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: 0,
              caretColor: '#F0C946',
            }}
          />
        </form>
      </div>
    </div>
  );
}
