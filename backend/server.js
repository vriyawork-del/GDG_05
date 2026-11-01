// Backend for GDG on Campus MMMUT.
// Serves the website from ../frontend and handles the join form at /api/join.
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const FILE = path.join(__dirname, 'members.json');
const PORT = process.env.PORT || 3000;      // web hosts choose the port

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

function load() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch { return []; }
}

// Member count shown on the page: 128 is the starting number.
app.get('/api/join', (req, res) => {
  res.json({ count: 128 + load().length });
});

app.post('/api/join', (req, res) => {
  const body = req.body || {};
  const name = String(body.name || '').trim().slice(0, 60);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 100);
  const interest = String(body.interest || '').slice(0, 40);
  const event = String(body.event || '').slice(0, 80);
  const members = load();

  // Bots fill the hidden "website" field: pretend it worked, save nothing.
  if (body.website) return res.json({ message: 'Thanks!', count: 128 + members.length });

  if (name.length < 2) return res.status(400).json({ error: 'Enter your full name.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (members.some(m => m.email === email)) return res.status(409).json({ error: 'This email has already joined.' });

  members.push({ name, email, interest, event, joinedAt: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(members, null, 2));
  console.log('New member saved:', name, email);

  const extra = event ? ` You are registered for ${event}.` : '';
  res.status(201).json({
    message: `Welcome, ${name.split(' ')[0]}! You have joined the community.${extra}`,
    count: 128 + members.length
  });
});

app.listen(PORT, () => console.log('Open http://localhost:' + PORT));
