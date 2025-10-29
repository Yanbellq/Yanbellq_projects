import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const context = React.createContext();
export const CtxConsumer = context.Consumer;

const animals = ['snake', 'elephant', 'lion']


const routing = (
    <BrowserRouter>
        <context.Provider value={{animals: animals}}>
            <Routes>
                <Route path="/" Component={App} />
                <Route path="/header" Component={Header} />
                <Route path="/footer" Component={Footer} />
            </Routes>
        </context.Provider>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        { routing }
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
