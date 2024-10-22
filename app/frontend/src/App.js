import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/SignUp" element={<SignUp></SignUp>} />
                <Route path="/Landing" element={<Landing></Landing>} />
            </Routes>
        </Router>
    );
}

export default App;
