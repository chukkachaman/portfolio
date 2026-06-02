const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://portfolio-xi-blue-63.vercel.app',
  'https://chamantej.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const portfolioData = {
  personal: {
    name: 'Chaman Tej Chukka',
    title: 'Full Stack Developer & CS Student',
    email: 'chamantej.chukka@gmail.com',
    bio: 'Passionate CS student at IIT (BHU) Varanasi with hands-on experience in full-stack development. I love building real-world applications and solving complex problems.',
    location: 'Varanasi, India',
    college: 'IIT (BHU) Varanasi',
    github: 'https://github.com/chukkachaman',
    linkedin: 'https://www.linkedin.com/in/chaman-tej-59101033a/',
  },
  skills: [
    { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Django', 'Python', 'REST APIs'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker'] },
    { category: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C', 'C++'] },
  ],
  experience: [
    {
      id: 1,
      role: 'Full Stack Developer Intern',
      company: 'Tech Startup',
      duration: 'Jun 2025 – Aug 2025',
      type: 'internship',
      description: 'Built and maintained REST APIs using Node.js and Express. Developed responsive UI components with React.js. Worked in an Agile team environment.',
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Git'],
    },
    {
      id: 2,
      role: 'Web Developer Intern',
      company: 'Digital Agency',
      duration: 'Jan 2025 – Apr 2025',
      type: 'internship',
      description: 'Designed and developed client websites using React and Django. Integrated third-party APIs and improved site performance by 40%.',
      technologies: ['Django', 'React.js', 'Python', 'MySQL'],
    },
    {
      id: 3,
      role: 'Software Engineering Intern',
      company: 'IT Company',
      duration: 'May 2024 – Jul 2024',
      type: 'internship',
      description: 'Developed automated testing scripts and assisted in backend development. Gained experience with cloud deployment on AWS.',
      technologies: ['Python', 'AWS', 'Docker', 'Git'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A responsive personal portfolio built with React.js frontend and Node.js/Express backend. Features dynamic data fetching, contact form, animated UI, and is deployed on Vercel + Render.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'CSS3'],
      github: 'https://github.com/chukkachaman/portfolio',
      live: 'https://chamantej.vercel.app',
      image: 'portfolio',
      collaboration: false,
    },
    {
      id: 2,
      title: 'Book Recommendation System',
      description: 'An intelligent book recommendation system using collaborative filtering and content-based algorithms. Suggests personalized book recommendations based on user preferences and reading history.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'NLP'],
      github: 'https://github.com/chukkachaman/Book_Recommendation_System',
      live: '',
      image: 'books',
      collaboration: true,
    },
    {
      id: 3,
      title: 'Stock Trading Portfolio',
      description: 'A Python-based stock trading portfolio tracker and analyzer. Tracks stock performance, visualizes portfolio allocation, and analyzes trading patterns using real-time market data.',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis', 'Finance API'],
      github: '',
      live: '',
      image: 'stocks',
      collaboration: false,
    },
  ],
};

app.get('/api/portfolio', (req, res) => res.json(portfolioData));
app.get('/api/skills', (req, res) => res.json(portfolioData.skills));
app.get('/api/experience', (req, res) => res.json(portfolioData.experience));
app.get('/api/projects', (req, res) => res.json(portfolioData.projects));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });
  console.log(`New contact from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
