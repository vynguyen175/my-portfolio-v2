export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vy Nguyen',
    url: 'https://my-portfolio-vynguyen.vercel.app',
    image: 'https://my-portfolio-vynguyen.vercel.app/me-1.jpg',
    description: 'Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML. Based in Toronto.',
    sameAs: [
      'https://github.com/vynguyen175',
      'https://www.linkedin.com/in/vy-nguyen-71629729b/',
    ],
    jobTitle: 'Full-Stack Developer',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Python', 'Machine Learning', 'Node.js'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'George Brown College',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vy Nguyen Portfolio',
    url: 'https://my-portfolio-vynguyen.vercel.app',
    description: 'Portfolio of Vy Nguyen, a full-stack developer based in Toronto.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
