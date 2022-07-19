import get from 'lodash/get';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, SessionManager } from '@did-connect/react';

import { SessionProvider, useSessionContext } from './contexts/session';

import './app.css';
import Home from './pages/home';

function App() {
  const { session } = useSessionContext();
  return (
    <div className="app">
      <SessionManager session={session} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';
  const tmp = new URL(window.location.origin);
  tmp.pathname = '/.well-known/service/api/connect/relay';
  console.log(tmp.href);

  return (
    <ThemeProvider>
      <SessionProvider serviceHost={get(window, 'blocklet.prefix', '/')} relayUrl={tmp.href}>
        <Router basename={basename}>
          <App />
        </Router>
      </SessionProvider>
    </ThemeProvider>
  );
}
