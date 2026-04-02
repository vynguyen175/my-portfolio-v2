'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingElements from '@/components/FloatingElements';
import SectionNav from '@/components/SectionNav';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflowX: 'hidden' }}>
      <FloatingElements />
      <SectionNav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CredentialsSection />
      <ContactSection />
    </main>
  );
}
