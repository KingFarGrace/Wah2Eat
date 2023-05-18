import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './global.less';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
