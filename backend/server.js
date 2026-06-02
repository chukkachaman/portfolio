const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const portfolioData = {
  personal: {
    name: 'Chaman Tej Chukka',
    title: 'Full Stack Developer & CS Student',
    email: 'chamantej.chukka@gmail.com',
    bio: 'Passionate computer science student with hands-on experience in full-stack development. I love building real-world applications and solving complex problems.',
    location: 'India',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
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
      title: 'StudyBud Platform',
      description: 'A full-stack study room application where students can create rooms, join discussions, and collaborate in real time.',
      technologies: ['Django', 'Python', 'HTML', 'CSS'],
      github: 'https://github.com',
      live: '',
      image: 'studybud',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'This responsive portfolio website built with React.js and Node.js to showcase skills, projects, and experience.',
      technologies: ['React.js', 'Node.js', 'CSS3'],
      github: 'https://github.com',
      live: '',
      image: 'portfolio',
    },
    {
      id: 3,
      title: 'CloudSim Simulation',
      description: 'Cloud computing simulation project using CloudSim framework to model and analyze cloud resource scheduling algorithms.',
      technologies: ['Java', 'CloudSim', 'Eclipse'],
      github: 'https://github.com',
      live: '',
      image: 'cloudsim',
    },
  ],
};

app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.get('/api/experience', (req, res) => {
  res.json(portfolioData.experience);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  console.log(`New contact from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
