import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.less';

// Create a root element for ReactDOM rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app component inside the root element
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
