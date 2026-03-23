import { Github, Linkedin, Mail, FileText, Code, Briefcase, User, Home, Award, Star, Zap } from 'lucide-react';

export const portfolioData = {
    personal: {
        name: "Shubham Ubhe",
        title: "Passionate Software Specialist | Expert in Innovative Solutions",

        email: "ubheshubham.37@gmail.com",
        location: "California, United States",
        bio: "AI Data Engineer at STAND 8 Technology Consulting. I architect intelligent systems that bridge the gap between data and decision-making. With deep expertise in Generative AI, Large Language Models (LLMs), and Data Engineering, I build scalable solutions that solve complex real-world problems. A 3x Hackathon Winner and open-source contributor, I am passionate about pushing the boundaries of what's possible with AI.",
        social: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/shubhamubhe/", icon: Linkedin },
            { name: "GitHub", url: "https://github.com/cheesychicken", icon: Github },
            { name: "Instagram", url: "https://www.instagram.com/_shubhs_ubhe_/", icon: Zap },
            { name: "Email", url: "mailto:ubheshubham.37@gmail.com", icon: Mail },
            { name: "Resume", url: "/Resume_latest.pdf", icon: FileText },
        ],
        education: [
            {
                degree: "Bachelor of Technology",
                school: "Vishwakarma Institute of Information Technology, India",
                year: "2018 - 2022",
                grade: "GPA: 8.99/10"
            }
        ]
    },
    skills: [
        { name: "Python", level: 98 },
        { name: "GenAI & LLMs", level: 95 },
        { name: "RAG & Vector DBs", level: 92 },
        { name: "Data Engineering", level: 90 },
        { name: "React & FastAPI", level: 85 },
        { name: "Cloud (AWS/GCP)", level: 85 },
        { name: "Docker & K8s", level: 80 },
        { name: "PyTorch & TensorFlow", level: 85 },
    ],
    achievements: [
        {
            id: 1,
            title: "Smart India Hackathon Winner",
            description: "Won National Hackathon for building a RAG agent for log analysis. Awarded 75,000 INR cash prize.",
            icon: Award,
            image: "/achievements/sih_final.jpg"
        },
        {
            id: 2,
            title: "VishwaCTF Winner",
            description: "Secured 1st place in the Capture The Flag cybersecurity challenge. Awarded 5,000 INR cash prize.",
            icon: Zap,
            image: "/achievements/vishwactf_final.jpg"
        },
        {
            id: 3,
            title: "LTIMindtree Solvathon Finalist",
            description: "Recognized as a finalist in the corporate innovation challenge. Awarded 1,600 INR cash prize.",
            icon: Star,
            image: "/achievements/corporate_innovation.png"
        },
        {
            id: 4,
            title: "NASA Space Apps: Galactic Problem Solver",
            description: "Designed an astronaut health maintenance app. Recognized as a Galactic Problem Solver.",
            icon: Star,
            image: "/achievements/nasa_final.png"
        }
    ],

    story: [
        {
            title: "The Beginning: VishwaCTF",
            description: "My journey into tech wasn't just about code; it was about solving puzzles. Winning the VishwaCTF cybersecurity challenge ignited my passion for digging deeper into systems and finding innovative solutions.",
            image: "/achievements/vishwactf_final.jpg"
        },
        {
            title: "National Recognition",
            description: "The Smart India Hackathon was a turning point. Building a RAG agent for log analysis and winning the 75,000 INR prize validated my belief that AI could solve messy, real-world data problems.",
            image: "/achievements/sih_final.jpg"
        },
        {
            title: "Global Impact: NASA Space Apps",
            description: "As a 'Galactic Problem Solver', I designed an astronaut health app. This experience taught me to think big—beyond the constraints of Earth—and apply technology to human survival.",
            image: "/achievements/nasa_final.png"
        },
        {
            title: "Corporate Innovation",
            description: "At LTIMindtree, I didn't just code; I innovated. Being a Solvathon Finalist and driving GenAI adoption proved that entrepreneurial spirit thrives even in large enterprises.",
            image: null
        }
    ],
    certifications: [
        // LTIMindtree Certifications
        { title: "Apache Airflow", fileName: "Apache_Airflow.pdf", category: "LTIMindtree" },
        { title: "Business Continuity Crisis Management", fileName: "Business_Continuity_Crisis_Manangment.do.pdf", category: "LTIMindtree" },
        { title: "AI Models and Architecture", fileName: "CertificateOfCompletion_AI_Models_and_Architecture.pdf", category: "LTIMindtree" },
        { title: "AI & Generative AI", fileName: "CertificateOfCompletion_AI_GenerativeAI.pdf", category: "LTIMindtree" },
        { title: "AWS Cloud Practitioner", fileName: "CertificateOfCompletion_AWS_Cloud_Practioner.pdf", category: "LTIMindtree" },
        { title: "Azure Databricks", fileName: "CertificateOfCompletion_Azure_Databricks.pdf", category: "LTIMindtree" },
        { title: "Channels", fileName: "CertificateOfCompletion_Channels.pdf", category: "LTIMindtree" },
        { title: "ChatGPT and Generative AI", fileName: "CertificateOfCompletion_ChatGPT_and_Generative_AI.pdf", category: "LTIMindtree" },
        { title: "Databricks Overview", fileName: "CertificateOfCompletion_Databricks_Overview_session.pdf", category: "LTIMindtree" },
        { title: "Final Project Evaluation", fileName: "CertificateOfCompletion_Final_PRoject_Evaluation.pdf", category: "LTIMindtree" },
        { title: "Generative AI Ethics & Evaluation", fileName: "CertificateOfCompletion_Navigating_Generative_AI_Hurdle_Prototyping__Evaluation_and_Ethics.pdf", category: "LTIMindtree" },
        { title: "Spark Learning (O'Reilly)", fileName: "CertificateOfCompletion_O-relly_Spark_learning.pdf", category: "LTIMindtree" },
        { title: "Project Gladiator", fileName: "CertificateOfCompletion_Project_Gladoator.pdf", category: "LTIMindtree" },
        { title: "Prompt Engineering with GenAI", fileName: "CertificateOfCompletion_Prompt_engineeringwithGenerativeAI.pdf", category: "LTIMindtree" },
        { title: "Python Programming Essentials", fileName: "CertificateOfCompletion_Python_Programming_Essentials.pdf", category: "LTIMindtree" },
        { title: "Conducting Effective Meetings", fileName: "CertificateOfCompletion_cross_Knowledge_COnducting_Effective_Meetings.pdf", category: "LTIMindtree" },
        { title: "Databricks Apache PySpark", fileName: "CertificateOfCompletion_databricks_Apache_PySpark.pdf", category: "LTIMindtree" },
        { title: "Introduction to MLOps", fileName: "CertificateOfCompletion_introduction_to_MLOps.pdf", category: "LTIMindtree" },
        { title: "Introduction to SQL", fileName: "CertificateOfCompletion_introduction_to_SQL.pdf", category: "LTIMindtree" },
        { title: "Lakehouse and SQL Analytics", fileName: "CertificateOfCompletion_lakehouse_and_SQL_Analytics.pdf", category: "LTIMindtree" },
        { title: "Client Interview Training", fileName: "Client_INterview.do.pdf", category: "LTIMindtree" },
        { title: "Communication Training", fileName: "Communication_Training.do.pdf", category: "LTIMindtree" },
        { title: "Data Privacy Awareness", fileName: "Data_Privacy_Awareness.do.pdf", category: "LTIMindtree" },
        { title: "Information Security Training", fileName: "Information_Awareness_Securoty_Training.do.pdf", category: "LTIMindtree" },
        { title: "React Fundamentals", fileName: "React_Fundamentals.do.pdf", category: "LTIMindtree" },
        { title: "Snowflake Specialization", fileName: "Snowflake_Specialization_Phase.do.pdf", category: "LTIMindtree" },
        { title: "Snowflake Bootcamp Assessment", fileName: "Snowflake_Bootcamp_Phase_Assesment.do.pdf", category: "LTIMindtree" },
        { title: "Workplace Compliance", fileName: "Workplace_compliance_training.do.pdf", category: "LTIMindtree" },
        { title: "Communication Training (Dec)", fileName: "commjunication_training_5_december.do.pdf", category: "LTIMindtree" },
        { title: "Intro to Prompt Engineering", fileName: "intoriductiontopromptengineering.do.pdf", category: "LTIMindtree" },

        // Personal Certifications
        { title: "Business Metrics for Data-Driven Companies", fileName: "Coursera_JGQCJSHQ8RAW.pdf", category: "Personal" },
        { title: "Python Data Structures", fileName: "Coursera_U4RKSDSCKKC4.pdf", category: "Personal" },
        { title: "Programming for Everybody (Getting Started with Python)", fileName: "Coursera_UMJA5R2QWQQQ.pdf", category: "Personal" },
        { title: "DLI Deep Learning Institute", fileName: "DLI_C-FX-03_Certificate___Deep_Learning_Institute.pdf", category: "Personal" },
        { title: "CCNA Module 1", fileName: "ShubhamUbhe-CCNA_70_Module_1-certificate.pdf", category: "Personal" },
        { title: "Switching & Routing", fileName: "ShubhamUbhe-Switching_Routin-certificate.pdf", category: "Personal" },
        { title: "Python Score Report", fileName: "Shubham_Ubhe_Python_Score_Report.pdf", category: "Personal" }
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
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Enterprise RAG System",
            description: "High-performance Retrieval-Augmented Generation system designed for querying millions of legal documents with high accuracy and low latency.",
            tags: ["RAG", "Vector DB", "React", "Python"],
            link: "https://github.com/cheesychicken",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Scalable Data Lakehouse",
            description: "Architected a modern data lakehouse solution on AWS, enabling real-time analytics and reducing data processing costs by 30%.",
            tags: ["AWS", "Spark", "Delta Lake", "Airflow"],
            link: "https://github.com/cheesychicken",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "NLP Patent Analysis Tool",
            description: "Developed automated NLP tools to extract key insights from patent documents, reducing manual research time by 60% for legal teams.",
            tags: ["NLP", "Python", "spaCy", "Elasticsearch"],
            link: "https://github.com/cheesychicken",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            title: "Real-time ML Pipeline",
            description: "Built end-to-end ML pipeline for real-time fraud detection, processing 10K+ transactions per second with 99.2% accuracy.",
            tags: ["MLOps", "Kafka", "Docker", "TensorFlow"],
            link: "https://github.com/cheesychicken",
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
        }
    ],
    experience: [
        {
            id: 1,
            role: "AI Data Engineer",
            company: "STAND 8 Technology Consulting",
            period: "November 2025 - Present",
            description: "Joining the Innovation Team to architect and build scalable in-house products. Focusing on OpenAI Embeddings for semantic search, RAG architectures, and full-stack data engineering pipelines."
        },
        {
            id: 2,
            role: "Senior AI/DS Software Engineer",
            company: "LTIMindtree",
            period: "August 2023 - November 2025",
            description: "Technical Architect leveraging Python, PyTorch, and MLOps. Led development of enterprise LLM platforms processing 20M+ tokens daily. Implemented fine-tuning pipelines for Llama-3 and Mistral models, reducing hallucinations by 65%."
        },
        {
            id: 3,
            role: "Data Engineer - Artificial Intelligence",
            company: "LTIMindtree",
            period: "November 2022 - July 2023",
            description: "Spearheaded development of 'Canvas Eureka' cloud migration tool. Built Spark and AI-based reconciliation tools validating 10TB+ of migrated data. Developed Generative AI solutions using Vertex AI."
        },
        {
            id: 4,
            role: "Research Intern",
            company: "Photon Legal",
            period: "February 2022 - May 2022",
            description: "Pioneered the use of NLP techniques for patent analysis. Learned patent searching, Form 18 filing, and web3.0 concepts."
        }
    ],
    timeline: [
        {
            year: "2025",
            title: "Joined STAND 8 (Innovation Team)",
            description: "Architecting in-house AI products in California.",
            proof: null,
            type: "work"
        },
        {
            year: "2025",
            title: "LTIMindtree Journey Completed",
            description: "Successfully delivered major GenAI projects.",
            proof: "/certificates/LTI_Relieving_Letter.pdf",
            type: "milestone"
        },
        {
            year: "2023",
            title: "Promoted to Sr. AI Architect",
            description: "Recognized for AI leadership and product capability.",
            proof: "/certificates/LTI_Service_Certificate.pdf",
            type: "work"
        },
        {
            year: "2023",
            title: "Azure Databricks & PySpark Certified",
            description: "Mastered big data processing and unified analytics.",
            proof: "/certificates/Azure_Databricks.pdf",
            type: "certification"
        },
        {
            year: "2023",
            title: "AWS Certified Cloud Practitioner",
            description: "Validated overall understanding of AWS Cloud platform.",
            proof: "/certificates/AWS_Cloud_Practitioner.pdf",
            type: "certification"
        },
        {
            year: "2022",
            title: "B.Tech Graduation",
            description: "Graduated with High Distinction (8.99 GPA) from VIIT.",
            proof: "/certificates/Degree_SPPU.pdf",
            type: "education"
        }
    ],
    dockItems: [
        { id: 'home', label: 'Home', icon: Home, to: '/' },
        { id: 'about', label: 'About', icon: User, to: '/about' },
        { id: 'projects', label: 'Projects', icon: Code, to: '/projects' },
        { id: 'experience', label: 'Experience', icon: Briefcase, to: '/experience' },
        { id: 'certifications', label: 'Certifications', icon: Award, to: '/certifications' },
        { id: 'life', label: 'Life', icon: Star, to: '/life' },
        { id: 'interactive', label: 'Playground', icon: Zap, to: '/interactive' },
        { id: 'contact', label: 'Contact', icon: Mail, to: '/contact' },
    ]
};
