import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Landing from './pages/Landing/Landing';
import Test from './pages/Test';
import Login from './pages/Login/Login';
import AddFlights from './pages/AddFlights/AddFlights';
import Explore from './pages/Explore/Explore';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
    
    return (
        <Router>
            <div>
                <Header></Header>
                <Routes>
                    <Route path="/signup" element={<SignUp></SignUp>} />
                    <Route path="/explore" element={<Explore></Explore>} />
                    <Route path="/test" element={<Test></Test>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/" element={<Landing></Landing>} />
                    <Route path="/:userId" element={<Landing></Landing>} />
                    <Route path="/addflights" element={<AddFlights></AddFlights>} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
