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
  // Academic work sample fields
  course: string;
  semester: string;
  approach: string;
  technicalDecisions: string;
  keyLearnings: string[];
}

export const projects: Project[] = [
  {
    id: 7,
    title: "Sushi Rock",
    description: "Restaurant website for a real Toronto sushi spot - built with online ordering, reservations, and multi-location support.",
    longDescription: "A real Toronto sushi restaurant with two locations needed a modern website that handles online ordering for pickup, table reservations, Uber Eats integration, and multi-location support — all while being fast enough to rank well in local search results.",
    category: "Full Stack",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/A-Shalchian/sushi-rock",
    liveUrl: "https://sushirock.vercel.app/",
    featured: true,
    images: [
      "/projects/sushi-rock/screenshot1.png",
      "/projects/sushi-rock/screenshot2.png",
      "/projects/sushi-rock/screenshot3.png",
      "/projects/sushi-rock/screenshot4.png",
    ],
    course: "Full Stack Development",
    semester: "Fall 2024",
    approach: "Worked directly with the restaurant owner to gather requirements. Adopted an iterative approach: built a core menu and ordering system first, then added reservations and multi-location features based on client feedback. Prioritized SEO and page load speed since the client depended on Google search traffic.",
    technicalDecisions: "Chose Next.js for server-side rendering (critical for SEO and local search ranking). Used Tailwind CSS for rapid, responsive UI development. Integrated Google Maps API for multi-location support. Deployed on Vercel for automatic HTTPS and CDN edge caching.",
    keyLearnings: [
      "Building for a real client with real constraints is fundamentally different from personal projects — requirements change, deadlines are firm, and reliability is non-negotiable",
      "SEO matters for business applications — server-side rendering and proper meta tags directly impact the client's revenue",
      "Client communication is a skill: translating business needs into technical requirements and managing expectations",
    ],
  },
  {
    id: 4,
    title: "Smart Inventory Management",
    description: "Full-stack inventory system with real-time tracking, reporting, and analytics - built with ASP.NET Core and SQL Server.",
    longDescription: "Businesses need reliable inventory tracking systems that monitor stock levels, generate automated low-stock alerts, and produce reports with export functionality. The goal was to build a production-grade system using the .NET ecosystem to learn enterprise development patterns.",
    category: "Full Stack",
    techStack: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "Razor", "Bootstrap", "Git/GitHub"],
    githubUrl: "https://github.com/vynguyen175/SmartInventoryManagement",
    liveUrl: "https://smartinventorymanagement-production.up.railway.app/",
    featured: true,
    images: [
      "/projects/inventory/Screenshot%202026-03-18%20220639.png",
      "/projects/inventory/Screenshot%202026-03-18%20220654.png",
      "/projects/inventory/Screenshot%202026-03-18%20220703.png",
      "/projects/inventory/Screenshot%202026-03-18%20221846.png",
    ],
    course: "Backend Development",
    semester: "Fall 2024",
    approach: "Started with database schema design using Entity Framework Core's code-first approach. Built the application layer-by-layer: data access, business logic, then presentation. Focused on proper separation of concerns using the MVC pattern.",
    technicalDecisions: "Chose ASP.NET Core MVC over a SPA approach because the application is data-heavy and benefits from server-side rendering with Razor views. Used Entity Framework Core for ORM. Deployed on Railway to get experience with a different cloud platform. Used SQL Server for relational data integrity.",
    keyLearnings: [
      "Entity Framework Core relationships and query optimization require careful planning — N+1 query problems are real",
      "The MVC pattern in .NET is more opinionated than React/Next.js — this structure helps in larger codebases",
      "Database schema design for inventory transactions requires thinking about audit trails and data consistency",
    ],
  },
  {
    id: 5,
    title: "Gameboxd",
    description: "Social platform for gamers - track, rate, and review games. Built as both a web app and a native Android app.",
    longDescription: "Gamers lack a dedicated social platform for tracking their gaming library, rating/reviewing games, and discovering what friends are playing. The challenge was building this for both web and mobile platforms with a shared backend.",
    category: "Full Stack",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "MongoDB", "Android", "Java", "Gradle"],
    githubUrl: "https://github.com/vynguyen175/Gameboxd-Web-App",
    liveUrl: "https://gameboxd-web-app.vercel.app/",
    featured: true,
    images: [],
    course: "Mobile App Development / Full Stack Development",
    semester: "Winter 2025",
    approach: "Started with database schema design since both platforms would share the same data. Built the web app first with Next.js to rapidly prototype features, then rebuilt the same experience as a native Android app. Used an API-first approach so both clients consume the same endpoints.",
    technicalDecisions: "Chose MongoDB for flexible document schemas that map well to game data. Used Next.js API routes as the shared backend. For Android, chose native Java over React Native to gain experience with the Android SDK directly. Designed the follower/activity feed system using MongoDB aggregation pipelines.",
    keyLearnings: [
      "Cross-platform data modeling requires thinking about access patterns upfront — what works for a React SPA may not work for Android RecyclerViews",
      "MongoDB aggregation pipelines are essential for social features like activity feeds — simple queries don't scale",
      "Building the same product on two platforms reveals the real tradeoffs between web and native development",
    ],
  },
  {
    id: 6,
    title: "Gomoku - Five in a Row",
    description: "Strategy board game with AI opponents powered by Minimax algorithm - three difficulty levels, fully playable in the browser.",
    longDescription: "Implement a Gomoku (Five in a Row) game with AI opponents that play at three difficulty levels. The AI must evaluate thousands of possible moves efficiently without freezing the browser, requiring algorithm optimization and performance tuning.",
    category: "Game Development",
    techStack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Minimax Algorithm", "Alpha-Beta Pruning"],
    githubUrl: "https://github.com/vynguyen175/Gomoku",
    liveUrl: "https://vynguyen175.github.io/Gomoku/web/",
    featured: true,
    images: [
      "/projects/gomoku/Screenshot%202026-03-19%20160000.png",
      "/projects/gomoku/Screenshot%202026-03-19%20160012.png",
      "/projects/gomoku/Screenshot%202026-03-19%20160025.png",
      "/projects/gomoku/Screenshot%202026-03-19%20160051.png",
    ],
    course: "Data Structures & Algorithms",
    semester: "Winter 2025",
    approach: "Implemented the Minimax algorithm with Alpha-Beta pruning for the AI decision engine. The core challenge was designing an evaluation function that balances positional advantage, threat detection, and defensive play. Tuned search depth per difficulty level to balance AI strength against response time.",
    technicalDecisions: "Chose vanilla JavaScript to keep the bundle small and the game fast. Used Alpha-Beta pruning to reduce the Minimax search space from O(b^d) to O(b^(d/2)). Designed the evaluation function to score board positions based on consecutive pieces, open ends, and blocking opportunities. Built mobile-first with Tailwind CSS.",
    keyLearnings: [
      "Alpha-Beta pruning makes an enormous practical difference — without it, the AI couldn't search deep enough to play competitively",
      "Evaluation function design is an art: balancing offense, defense, and positional value requires extensive testing",
      "Browser performance constraints force you to think about algorithmic efficiency in ways that server-side code doesn't",
    ],
  },
  {
    id: 1,
    title: "Vizion",
    description: "AI-powered data visualization platform - upload datasets and get interactive dashboards and ML-driven insights.",
    longDescription: "Non-technical users need a way to upload datasets and get meaningful visualizations, statistical summaries, and machine learning predictions without writing code. The challenge was building a system that automatically adapts to different data types and column structures.",
    category: "AI / Machine Learning",
    techStack: ["Python", "Streamlit", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
    githubUrl: "https://github.com/vynguyen175/vizion",
    liveUrl: "https://vizion-byvynguyen.streamlit.app/",
    featured: true,
    images: [],
    course: "Applied Machine Learning",
    semester: "Winter 2025",
    approach: "Built a data pipeline that ingests CSV files, automatically detects column types (numerical, categorical, datetime), and generates appropriate visualizations. Added ML model training where users can select target variables and get predictions. Used Streamlit for rapid prototyping.",
    technicalDecisions: "Chose Python for its data science ecosystem. Used Pandas for data processing, Scikit-learn for ML models, Streamlit for the frontend because it allows rapid iteration on data apps. Focused on handling edge cases in data cleaning (missing values, mixed types, outliers).",
    keyLearnings: [
      "Data cleaning is 80% of the work in any ML project — handling missing values, mixed types, and outliers robustly is critical",
      "Feature engineering decisions have more impact on model quality than algorithm choice",
      "Building for non-technical users requires thinking about error messages, defaults, and graceful degradation",
    ],
  },
  {
    id: 2,
    title: "ÉVO - Modern Luxury",
    description: "Luxury e-commerce fashion platform with full shopping cart, wishlists, and a clean minimalist design.",
    longDescription: "Build a complete e-commerce experience from scratch with product browsing, wishlist management, shopping cart with size selection, and a responsive checkout flow — all with a premium minimalist design.",
    category: "E-Commerce",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "MongoDB", "Vercel"],
    githubUrl: "https://github.com/vynguyen175/Evo",
    liveUrl: "https://evo-byvynguyen.vercel.app/",
    featured: true,
    images: [
      "/projects/evo/Screenshot%202026-02-02%20214119.png",
      "/projects/evo/Screenshot%202026-02-02%20214156.png",
      "/projects/evo/Screenshot%202026-02-02%20214213.png",
      "/projects/evo/Screenshot%202026-02-02%20214232.png",
      "/projects/evo/Screenshot%202026-02-02%20214244.png",
      "/projects/evo/Screenshot%202026-02-02%20214257.png",
      "/projects/evo/Screenshot%202026-02-02%20214322.png",
      "/projects/evo/Screenshot%202026-02-02%20214356.png",
    ],
    course: "Full Stack Development",
    semester: "Fall 2024",
    approach: "Started with the data model and product schema in MongoDB. Built the product catalog first, then layered on interactive features (cart, wishlist, filtering). Focused heavily on responsive design early since fashion e-commerce traffic is predominantly mobile.",
    technicalDecisions: "Used Next.js for SEO-friendly product pages. MongoDB for flexible product schemas. Managed cart and wishlist state with React context. Built a custom filtering system for collections. Prioritized mobile-first responsive design with Tailwind CSS.",
    keyLearnings: [
      "State management for e-commerce (cart persistence, wishlist sync) is more complex than it appears — edge cases around size variants and session handling",
      "Mobile-first design isn't optional for e-commerce — over 70% of fashion shopping is on phones",
      "Design restraint is harder than adding features — the minimalist aesthetic required saying 'no' to decorative elements",
    ],
  },
  {
    id: 3,
    title: "Netflix Recommendation Engine",
    description: "ML-powered movie recommendation system - analyzes viewing patterns to suggest personalized Netflix content.",
    longDescription: "Build a content-based filtering system that recommends movies and TV shows based on genres, ratings, and viewing patterns. The core challenge was feature engineering — capturing what makes two shows 'similar' in a meaningful way.",
    category: "AI / Machine Learning",
    techStack: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Machine Learning", "Recommendation Systems"],
    githubUrl: "https://github.com/vynguyen175/Netflix_Recommendation_Engine",
    liveUrl: "https://netflix-recommend-engine.streamlit.app",
    featured: true,
    images: [
      "/projects/netflix/Screenshot%202026-03-18%20211142.png",
      "/projects/netflix/Screenshot%202026-03-18%20211208.png",
      "/projects/netflix/Screenshot%202026-03-18%20211234.png",
      "/projects/netflix/Screenshot%202026-03-18%20211243.png",
    ],
    course: "Applied Machine Learning / Data Science",
    semester: "Winter 2025",
    approach: "Preprocessed the Netflix dataset to extract meaningful features. Implemented cosine similarity on feature vectors for the recommendation algorithm. Built an interactive Streamlit frontend for real-time exploration.",
    technicalDecisions: "Chose content-based filtering over collaborative filtering because the dataset lacked user interaction data. Used TF-IDF vectorization for text-based features and cosine similarity as the distance metric. Scikit-learn for the ML pipeline, Pandas for preprocessing.",
    keyLearnings: [
      "Feature engineering is the most impactful part of building recommendation systems — garbage features produce garbage recommendations",
      "Cosine similarity works surprisingly well for content-based recommendations when features are properly vectorized",
      "Real recommendation systems combine multiple approaches — this project taught the content-based foundation",
    ],
  },
];
