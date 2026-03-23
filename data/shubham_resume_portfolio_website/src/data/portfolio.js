import { Github, Linkedin, Mail, FileText, Code, Briefcase, User, Home, Award, Star, Zap } from 'lucide-react';

export const portfolioData = {
    personal: {
        name: "Shubham Ubhe",
        title: "AI Agent Architect | Data Engineer | Python Developer",
        email: "ubheshubham.37@gmail.com",
        location: "Pune, Maharashtra, India",
        bio: "I architect intelligent systems that bridge the gap between data and decision-making. With deep expertise in Generative AI, Large Language Models (LLMs), and Data Engineering, I build scalable solutions that solve complex real-world problems. A 3x Hackathon Winner and open-source contributor, I am passionate about pushing the boundaries of what's possible with AI.",
        social: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/shubhamubhe/", icon: Linkedin },
            { name: "GitHub", url: "https://github.com/cheesychicken", icon: Github },
            { name: "Instagram", url: "https://www.instagram.com/_shubhs_ubhe_/", icon: Zap },
            { name: "Email", url: "mailto:ubheshubham.37@gmail.com", icon: Mail },
            { name: "Resume", url: "/Resume_latest.pdf", icon: FileText },
        ]
    },
    skills: [
        { name: "Python", level: 98 },
        { name: "GenAI & LLMs", level: 95 },
        { name: "Data Engineering", level: 90 },
        { name: "React & Node.js", level: 85 },
        { name: "SQL & NoSQL", level: 90 },
        { name: "AWS & Cloud", level: 85 },
        { name: "MLOps & CI/CD", level: 85 },
        { name: "LangChain & RAG", level: 92 },
    ],
    achievements: [
        {
            id: 1,
            title: "3x Hackathon Winner",
            description: "Secured top positions in national-level hackathons by building innovative AI-driven solutions under tight deadlines.",
            icon: Award,
            image: "https://images.unsplash.com/photo-1596496050844-961f5518995b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "AI Innovation Leader",
            description: "Spearheaded the adoption of Generative AI tools at LTIMindtree, increasing developer productivity by 40%.",
            icon: Zap,
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Open Source Contributor",
            description: "Active contributor to major open-source AI frameworks, focusing on agentic workflows and RAG optimization.",
            icon: Star,
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
        }
    ],
    story: [
        {
            title: "The Spark",
            description: "It started with a simple question: 'Can computers think?' This curiosity led me from writing basic scripts to exploring the depths of neural networks and autonomous agents.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "The Evolution",
            description: "As I mastered Data Engineering, I realized that data is the fuel, but AI is the engine. I pivoted to specialize in LLMs, building systems that don't just process data, but understand it.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "The Mission",
            description: "Now, I'm on a mission to democratize AI. Whether it's through building intuitive agents or scalable pipelines, I create technology that empowers people to do more.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
        }
    ],
    lifeLocations: [
        {
            id: 'mountains',
            title: "The Mountains",
            description: "Where the air is thin and the spirit soars. From the frozen rivers of Chadar to the peaks of Ladakh.",
            type: "horizontal",
            images: [
                { src: "/instagram_images/202502_18031443488284802.jpg", caption: "Chadar Trek" },
                { src: "/instagram_images/202502_18046683245206483.jpg", caption: "Frozen River" },
                { src: "/instagram_images/202502_18133563748361177.jpg", caption: "Stargazing" },
                { src: "/instagram_images/202505_18068123524970595.jpg", caption: "Rishikesh Ride" },
                { src: "/instagram_images/midnight_dream.jpg", caption: "Midnight" },
                { src: "/instagram_images/202502_17842482843414254.jpg", caption: "Snowy Peaks" },
                { src: "/instagram_images/202502_17850027573393214.jpg", caption: "Winter Light" },
                { src: "/instagram_images/202502_17850448032401317.jpg", caption: "Cold Breath" },
                { src: "/instagram_images/202502_17856793170306715.jpg", caption: "High Altitude" },
                { src: "/instagram_images/202502_17862492657348532.jpg", caption: "Mountain Roads" },
                { src: "/instagram_images/202505_18039101936312745.jpg", caption: "Valley View" }
            ]
        },
        {
            id: 'beaches',
            title: "The Coast",
            description: "Sun, sand, and the timeless rhythm of the waves. Exploring the golden forts of the Konkan.",
            type: "horizontal",
            images: [
                { src: "/instagram_images/202503_18035203058286558.jpg", caption: "Suvarnadurg Fort" },
                { src: "/instagram_images/202503_17844802404430529.jpg", caption: "Coastal Fort" },
                { src: "/instagram_images/202503_17868431103340930.jpg", caption: "Sea Breeze" },
                { src: "/instagram_images/202503_17895355788178611.jpg", caption: "Golden Hour" },
                { src: "/instagram_images/202503_17998425089772880.jpg", caption: "Waves" },
                { src: "/instagram_images/202503_18022948022679189.jpg", caption: "Shoreline" },
                { src: "/instagram_images/202503_18047490647351585.jpg", caption: "Fort Walls" },
                { src: "/instagram_images/202503_18048001070198163.jpg", caption: "Ocean View" },
                { src: "/instagram_images/202503_18059976313970531.jpg", caption: "Sunset" },
                { src: "/instagram_images/202503_18063323638985364.jpg", caption: "Beach Vibes" }
            ]
        },
        {
            id: 'portraits',
            title: "The People",
            description: "Faces, smiles, and the moments in between. A collection of memories.",
            type: "stack",
            images: [
                { src: "/instagram_images/fit_check.jpg", caption: "Fit Check" },
                { src: "/instagram_images/202504_18058182668283481.jpg", caption: "Spring Days" },
                { src: "/instagram_images/202504_17877798972202102.jpg", caption: "Selfie" },
                { src: "/instagram_images/202504_17958676454923331.jpg", caption: "Good Times" },
                { src: "/instagram_images/202504_18008103875725407.jpg", caption: "Smile" },
                { src: "/instagram_images/202504_18028071662419870.jpg", caption: "Vibe" },
                { src: "/instagram_images/202504_18043003688178544.jpg", caption: "Mood" },
                { src: "/instagram_images/202504_18073145986700156.jpg", caption: "Candid" },
                { src: "/instagram_images/202504_18073152121877263.jpg", caption: "Portrait" },
                { src: "/instagram_images/202504_18077041057691886.jpg", caption: "Moments" },
                { src: "/instagram_images/202504_18087642898542377.jpg", caption: "Life" },
                { src: "/instagram_images/202504_18097719940547046.jpg", caption: "Capture" }
            ]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Autonomous AI Agent Framework",
            description: "A robust framework for building multi-agent systems capable of complex reasoning and task execution. Features include memory management, tool use, and self-correction.",
            tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
            link: "https://github.com/cheesychicken",
            image: "/project_ai_agent.png"
        },
        {
            id: 2,
            title: "Enterprise RAG System",
            description: "High-performance Retrieval-Augmented Generation system designed for querying millions of legal documents with high accuracy and low latency.",
            tags: ["RAG", "Vector DB", "React", "Python"],
            link: "https://github.com/cheesychicken",
            image: "/project_rag.png"
        },
        {
            id: 3,
            title: "Scalable Data Lakehouse",
            description: "Architected a modern data lakehouse solution on AWS, enabling real-time analytics and reducing data processing costs by 30%.",
            tags: ["AWS", "Spark", "Delta Lake", "Airflow"],
            link: "https://github.com/cheesychicken",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        }
    ],
    experience: [
        {
            id: 1,
            role: "Senior AI/DS Software Engineer",
            company: "LTIMindtree",
            period: "2022 - Present",
            description: "Driving the development of next-gen AI solutions. Responsible for architecting LLM-based applications, optimizing data pipelines, and mentoring junior developers. Successfully delivered 3 major GenAI projects for Fortune 500 clients."
        },
        {
            id: 2,
            role: "Research Intern",
            company: "Photon Legal",
            period: "2021 - 2022",
            description: "Pioneered the use of NLP techniques for patent analysis. Developed automated tools to extract key insights from legal documents, significantly reducing manual research time."
        },
        {
            id: 3,
            role: "Joint Department Head",
            company: "Cisco Networking Academy VIIT",
            period: "2020 - 2021",
            description: "Led a team of 50+ students in organizing technical workshops and hackathons. Foster a culture of learning and innovation within the department."
        }
    ],
    dockItems: [
        { id: 'home', label: 'Home', icon: Home, to: '/' },
        { id: 'about', label: 'About', icon: User, to: '/about' },
        { id: 'projects', label: 'Projects', icon: Code, to: '/projects' },
        { id: 'experience', label: 'Experience', icon: Briefcase, to: '/experience' },
        { id: 'life', label: 'Life', icon: Star, to: '/life' },
        { id: 'interactive', label: 'Playground', icon: Zap, to: '/interactive' },
        { id: 'contact', label: 'Contact', icon: Mail, to: '/contact' },
    ]
};
