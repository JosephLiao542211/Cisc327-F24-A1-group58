import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Test from './pages/Test';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp></SignUp>} />
                <Route path="/test" element={<Test></Test>} />
                <Route path="/login" element={<Login></Login>} />
            </Routes>
        </Router>
    );
}

export default App;
