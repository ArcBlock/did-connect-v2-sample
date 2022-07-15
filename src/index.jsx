import Buffer from 'buffer';
import ReactDOM from 'react-dom/client';
import App from './app';

window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
