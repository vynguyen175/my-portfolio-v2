'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Section {
  id: string;
  label: string;
  x: number;
}

export const SECTIONS: Section[] = [
  { id: 'hero', label: 'Home', x: 0 },
  { id: 'about', label: 'About', x: 30 },
  { id: 'projects', label: 'Projects', x: 60 },
  { id: 'skills', label: 'Skills', x: 90 },
  { id: 'credentials', label: 'Credentials', x: 120 },
  { id: 'contact', label: 'Contact', x: 150 },
];

interface NavigationContextType {
  currentIndex: number;
  currentSection: Section;
  targetX: number;
  isMoving: boolean;
  setIsMoving: (moving: boolean) => void;
  goToSection: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const goToSection = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, SECTIONS.length - 1));
    if (clamped !== currentIndex && !isMoving) {
      setCurrentIndex(clamped);
      setIsMoving(true);
      window.history.replaceState(null, '', `#${SECTIONS[clamped].id}`);
    }
  }, [currentIndex, isMoving]);

  const goNext = useCallback(() => {
    goToSection(currentIndex + 1);
  }, [currentIndex, goToSection]);

  const goPrev = useCallback(() => {
    goToSection(currentIndex - 1);
  }, [currentIndex, goToSection]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = SECTIONS.findIndex(s => s.id === hash);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, []);

  const currentSection = SECTIONS[currentIndex];
  const targetX = currentSection.x;

  return (
    <NavigationContext.Provider value={{ currentIndex, currentSection, targetX, isMoving, setIsMoving, goToSection, goNext, goPrev }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
}
