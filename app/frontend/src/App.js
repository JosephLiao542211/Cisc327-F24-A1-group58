import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import Test from './pages/Test';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp></SignUp>} />
                <Route path="/test" element={<Test></Test>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/SignUp" element={<SignUp></SignUp>} />
                <Route path="/" element={<Landing></Landing>} />
            </Routes>
        </Router>
    );
}

export default App;