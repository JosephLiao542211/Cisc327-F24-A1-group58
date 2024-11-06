// Landing.js
import React, { useEffect, useState,createContext } from 'react';
import Header from '../../components/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import DealsSection from './DealsSection/DealsSection';
import Footer from '../../components/Footer/Footer';
import './Landing.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const LoginContext = createContext('unspecified token');

const Landing = ({ token }) => {
  
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, [userId]);
  
    
  
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/flight');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error('FLIGHT ERROR:', error);
      }
    };

    fetchFlights();
  }, []);

  return (

    <div>
      <div className="container">
        {/* {userData &&
        (<h1>{userData.firstName}</h1>)
} */}
        <LoginContext.Provider value={{userData,setUserData}} >
           
            <HeroSection />
            <DealsSection flights={flights} />
        </LoginContext.Provider>
        </div>
      
    </div>
    
  );
};

export default Landing;
