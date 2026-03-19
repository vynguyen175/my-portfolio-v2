export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 7,
    title: "Sushi Rock",
    description: "Restaurant website for a real Toronto sushi spot - built with online ordering, reservations, and multi-location support.",
    longDescription: "Built a production website for Sushi Rock, a real Japanese restaurant with two locations in midtown Toronto. The challenge was creating a platform that handles online ordering for pickup, table reservations, and integrates with Uber Eats for delivery - all while keeping the UI clean and fast. I worked closely with the restaurant to understand their workflow and built around their actual needs. Key decisions included using Next.js for SEO and fast page loads (important for local search), and integrating Google Maps for multi-location support. This project taught me how to build for a real client with real constraints.",
    category: "Full Stack",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/A-Shalchian/sushi-rock",
    liveUrl: "https://sushirock.vercel.app/",
    featured: true,
    images: ["/projects/sushi-rock/screenshot1.png", "/projects/sushi-rock/screenshot2.png", "/projects/sushi-rock/screenshot3.png", "/projects/sushi-rock/screenshot4.png"],
  },
  {
    id: 4,
    title: "Smart Inventory Management",
    description: "Full-stack inventory system with real-time tracking, reporting, and analytics - built with ASP.NET Core and SQL Server.",
    longDescription: "Built this to learn the .NET ecosystem end-to-end. The app handles product management, stock level monitoring with automated low-stock alerts, and reporting with export functionality. The biggest challenge was designing the database schema to handle inventory transactions efficiently - I learned a lot about Entity Framework Core relationships and query optimization. Chose ASP.NET Core MVC over a SPA approach because the app is data-heavy and benefits from server-side rendering. Deployed on Railway to get experience with cloud hosting outside of Vercel.",
    category: "Full Stack",
    techStack: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "Razor", "Bootstrap", "Git/GitHub"],
    githubUrl: "https://github.com/vynguyen175/SmartInventoryManagement",
    liveUrl: "https://smartinventorymanagement-production.up.railway.app/",
    featured: true,
    images: ["/projects/inventory/screenshot1.png", "/projects/inventory/screenshot2.png"],
  },
  {
    id: 5,
    title: "Gameboxd",
    description: "Social platform for gamers - track, rate, and review games. Built as both a web app and a native Android app.",
    longDescription: "Inspired by Letterboxd but for gaming. I wanted to build something I'd actually use. Users can discover games, build their library, rate and review titles, and see what friends are playing. The hardest part was building the same product for two platforms - I built the web version with Next.js and MongoDB, then rebuilt it as a native Android app with Java. This taught me how to think about shared data models across platforms and the tradeoffs between web and native development. The social features (following, activity feeds) pushed me to learn more about database design and real-time data.",
    category: "Full Stack",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "MongoDB", "Android", "Java", "Gradle"],
    githubUrl: "https://github.com/vynguyen175/Gameboxd-Web-App",
    liveUrl: "https://gameboxd-web-app.vercel.app/",
    featured: true,
    images: ["/projects/gameboxd/screenshot1.png", "/projects/gameboxd/screenshot2.png"],
  },
  {
    id: 6,
    title: "Gomoku - Five in a Row",
    description: "Strategy board game with AI opponents powered by Minimax algorithm - three difficulty levels, fully playable in the browser.",
    longDescription: "Built a Gomoku (Five in a Row) game to get hands-on with algorithm design. The AI uses the Minimax algorithm with Alpha-Beta pruning to evaluate thousands of possible moves efficiently. The biggest challenge was tuning the evaluation function - I had to balance search depth against response time so the AI feels challenging but doesn't freeze the browser. Implemented three difficulty levels by adjusting search depth. Built mobile-first with Tailwind CSS so it plays well on phones. This was my deep dive into game theory and algorithmic thinking.",
    category: "Game Development",
    techStack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Minimax Algorithm", "Alpha-Beta Pruning"],
    githubUrl: "https://github.com/vynguyen175/Gomoku",
    liveUrl: "https://vynguyen175.github.io/Gomoku/web/",
    featured: true,
    images: ["/projects/gomoku/screenshot1.png", "/projects/gomoku/screenshot2.png"],
  },
  {
    id: 1,
    title: "Vizion",
    description: "AI-powered data visualization platform - upload datasets and get interactive dashboards and ML-driven insights.",
    longDescription: "Built Vizion to make data analysis accessible without writing code. Users upload a dataset and get interactive visualizations, statistical summaries, and ML model predictions. The challenge was handling diverse data formats and building visualizations that automatically adapt to different column types. I used Pandas for data processing and Scikit-learn for the ML models. This project deepened my understanding of the full data pipeline - from cleaning messy data to presenting actionable insights.",
    category: "AI / Machine Learning",
    techStack: ["Python", "Streamlit", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
    githubUrl: "https://github.com/vynguyen175/vizion",
    liveUrl: "https://vizion-byvynguyen.streamlit.app/",
    featured: true,
    images: ["/projects/vizion/screenshot1.png", "/projects/vizion/screenshot2.png"],
  },
  {
    id: 2,
    title: "ÉVO - Modern Luxury",
    description: "Luxury e-commerce fashion platform with full shopping cart, wishlists, and a clean minimalist design.",
    longDescription: "Built a complete e-commerce experience from scratch - product browsing, wishlist management, shopping cart with size selection, and a responsive checkout flow. The design challenge was creating a premium, minimalist aesthetic that lets the products speak for themselves. I handled state management for cart and wishlist across pages, built a filtering system for collections, and focused heavily on responsive design so the shopping experience feels native on mobile. Stored data with MongoDB and deployed on Vercel.",
    category: "E-Commerce",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "MongoDB", "Vercel"],
    githubUrl: "https://github.com/vynguyen175/Evo",
    liveUrl: "https://evo-byvynguyen.vercel.app/",
    featured: true,
    images: ["/projects/evo/screenshot1.png", "/projects/evo/screenshot2.png"],
  },
  {
    id: 3,
    title: "Netflix Recommendation Engine",
    description: "ML-powered movie recommendation system - analyzes viewing patterns to suggest personalized Netflix content.",
    longDescription: "Built a content-based filtering system that recommends movies and TV shows based on genres, ratings, and viewing patterns. I implemented the recommendation algorithm using cosine similarity on feature vectors - the main challenge was feature engineering to capture what makes two shows 'similar' in a meaningful way. Used Scikit-learn for the ML pipeline and Pandas for data processing. The Streamlit frontend lets users interact with recommendations in real-time. This project gave me practical experience with recommendation systems and data preprocessing at scale.",
    category: "AI / Machine Learning",
    techStack: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Machine Learning", "Recommendation Systems"],
    githubUrl: "https://github.com/vynguyen175/Netflix_Recommendation_Engine",
    liveUrl: "https://netflix-recommend-engine.streamlit.app",
    featured: true,
    images: ["/projects/netflix/screenshot1.png", "/projects/netflix/screenshot2.png"],
  },
];
