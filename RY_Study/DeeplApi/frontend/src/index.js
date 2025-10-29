import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './components/auth';
import Stats from './components/stats';
import PaymentSuccess from './components/payment-success';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter([
    { path: '/', element: <Auth /> },
    { path: '/translate', element: <App /> },
    { path: '/stats', element: <Stats /> },
    { path: '/payment-success', element: <PaymentSuccess /> },
])

const CLIENT_ID = '622193445965-gro86odqvrcbn72tuhj34obmtlom3i65.apps.googleusercontent.com'

function Router() {

    const [ token, setToken ] = useState(null);

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <CookiesProvider>
                <RouterProvider router={router} />
            </CookiesProvider>
        </GoogleOAuthProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
