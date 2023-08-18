import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx';
import { ChatContextProvider } from './context/ChatContext.tsx';

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <ChatContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        </ChatContextProvider>
    </AuthContextProvider>
)
