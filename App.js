import React, { useState } from 'react';
import './App.css';
import WeatherPage from './pages/WeatherPage';
import RecordsPage from './pages/RecordsPage';
import AboutPage from './pages/AboutPage';

const NAV_ITEMS = [
  { id: 'weather', label: '🌤 Weather', icon: '🌤' },
  { id: 'records', label: '📋 Records', icon: '📋' },
  { id: 'about', label: 'ℹ️ About', icon: 'ℹ️' },
];

export default function App() {
  const [activePage, setActivePage] = useState('weather');

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">🌐</span>
            <div>
              <h1 className="brand-title">WeatherScope</h1>
              <p className="brand-sub mono">by PM Accelerator</p>
            </div>
          </div>
          <nav className="header-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-btn ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label.split(' ')[1]}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="app-main">
        {activePage === 'weather' && <WeatherPage />}
        {activePage === 'records' && <RecordsPage />}
        {activePage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="mono">
          Built for <span className="accent">PM Accelerator</span> AI Engineer Intern Assessment
          <span className="muted"> · </span>
          Powered by OpenWeatherMap API
        </p>
      </footer>
    </div>
  );
}
