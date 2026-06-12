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
  projects: [
    {
      id: 1,
      title: 'Book Recommendation System',
      description: 'A session-based book recommendation system using the STAMP (Short-Term Attention/Memory Priority) model in PyTorch. Models short-term user intent and long-term preferences from interaction sequences. Built with a React frontend and Django backend for real-time recommendations.',
      technologies: ['PyTorch', 'Python', 'Django', 'React', 'NumPy', 'Pandas'],
      github: 'https://github.com/chukkachaman/book-recommendation-system',
      live: '',
      image: 'books',
      collaboration: true,
    },
    {
      id: 2,
      title: 'Stock Portfolio App',
      description: 'A stock trading simulation platform where users start with a $5,000 virtual budget to buy and sell 21 real NASDAQ/NYSE stocks. Integrates live market prices from Yahoo Finance with an interactive portfolio dashboard showing allocation and profit/loss using Chart.js.',
      technologies: ['Django', 'Python', 'SQLite', 'yfinance', 'Chart.js', 'jQuery'],
      github: 'https://github.com/chukkachaman/stock-portfolio-app',
      live: '',
      image: 'stocks',
      collaboration: false,
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive personal portfolio built with a React.js frontend and Node.js/Express backend. Features dynamic data fetching, animated UI, and a contact form. Deployed on Vercel (frontend) and Render (backend).',
      technologies: ['React.js', 'Node.js', 'Express.js', 'CSS3'],
      github: 'https://github.com/chukkachaman/portfolio',
      live: 'https://chamantej.vercel.app',
      image: 'portfolio',
      collaboration: false,
    },
    {
      id: 4,
      title: 'Automobile Shop Management System',
      description: 'A full-stack automobile shop management platform with 8 functional modules — customer records, vehicle management, service tracking, mechanic assignments, appointments, inventory, invoice generation, and role-based access. Secured with JWT authentication (ADMIN/CUSTOMER roles).',
      technologies: ['Spring Boot 3', 'Spring Security', 'JWT', 'React 19', 'MySQL', 'Hibernate/JPA'],
      github: 'https://github.com/chukkachaman/Automobile_Management_System',
      live: '',
      image: 'automobile',
      collaboration: false,
    },
  ],
};

app.get('/api/portfolio', (req, res) => res.json(portfolioData));
app.get('/api/skills', (req, res) => res.json(portfolioData.skills));
app.get('/api/projects', (req, res) => res.json(portfolioData.projects));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });
  console.log(`New contact from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
