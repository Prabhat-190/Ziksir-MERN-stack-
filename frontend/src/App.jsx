import React, { useState } from 'react';
import './App.css'; // Importing the CSS file

export default function App() {
  // --- STATE ---
  const [page, setPage] = useState('login'); // 'login', 'register', 'dashboard'
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([
    { id: 1, title: '🚀 Project Ideas', description: 'Build a MERN stack app with a clean, professional UI for Ziksir.' },
    { id: 2, title: '📅 Team Meeting', description: 'Review the backend integration code at 4:00 PM.' }
  ]);
  
  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newNote, setNewNote] = useState({ title: '', description: '' });

  // --- HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setPage('dashboard');
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Account created successfully! Logging you in...");
      setUser({ email, name: email.split('@')[0] });
      setPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setPage('login');
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.description) return;
    
    const note = { id: Date.now(), ...newNote };
    setNotes([note, ...notes]); // Add new note to the top
    setNewNote({ title: '', description: '' }); // Reset form
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  // --- RENDER VIEWS ---

  // 1. LOGIN & REGISTER VIEW
  if (page === 'login' || page === 'register') {
    const isLogin = page === 'login';
    
    return (
      <div className="split-screen">
        {/* Left Side: Motivational Image */}
        <div className="image-side">
          <div className="image-overlay">
            <h1>Ziksir.</h1>
            <p>Capture your thoughts, organize your life, and achieve more every day.</p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="form-side">
          <div className="form-container">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
              <p style={{ color: '#6b7280' }}>
                {isLogin ? 'Please enter your details to sign in.' : 'Start your 30-day free trial.'}
              </p>
            </div>

            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              <label>Email Address</label>
              <input 
                className="input-std" 
                type="email" 
                placeholder="name@company.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
              
              <label>Password</label>
              <input 
                className="input-std" 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
              
              <button className="btn-primary" type="submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span 
                className="link-text"
                onClick={() => setPage(isLogin ? 'register' : 'login')}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-logo">Ziksir Notes</div>
        <div className="user-menu">
          <span style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
            {user?.email}
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="main-content">
        
        {/* Left Column: Create Form */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>✍️ Create Note</h3>
          <form onSubmit={handleCreateNote}>
            <input 
              className="input-std" 
              placeholder="Note Title" 
              value={newNote.title} 
              onChange={e => setNewNote({...newNote, title: e.target.value})} 
              required
            />
            <textarea 
              className="input-std" 
              rows="6" 
              placeholder="Write your thoughts here..." 
              value={newNote.description} 
              onChange={e => setNewNote({...newNote, description: e.target.value})} 
              style={{ resize: 'vertical', minHeight: '100px' }}
              required
            />
            <button className="btn-primary" type="submit">Add Note</button>
          </form>
        </div>

        {/* Right Column: Notes Feed */}
        <div>
          <h2 className="section-title">My Notes</h2>
          
          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first note using the form on the left.</p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="note-item">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <button 
                  className="delete-x" 
                  onClick={() => handleDelete(note.id)}
                  title="Delete Note"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}