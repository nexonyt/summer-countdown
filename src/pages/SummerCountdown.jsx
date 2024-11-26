import React from "react";
import { useState,useEffect } from "react";
import styled from 'styled-components'



const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;
  
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return { days, hours, minutes, seconds };
  };

  

export default function SummerCountdown() {
    const targetDate = "2025-06-21T00:00:00"; // Data wakacji
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    const [theme,setTheme] = useState('light')
  
    const handleButtonTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };


  

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
  
      return () => clearInterval(timer); // Wyczyszczenie interwału po odmontowaniu komponentu
    }, [targetDate]);

    return (
        <MainDiv theme={theme}>

            <MainHeaderTitle>Odliczanie do wakacji 2025</MainHeaderTitle>
            <CountdownTimerMainDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.days}</DivForTimerCharachter><Label>DNI</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.hours}</DivForTimerCharachter><Label>GODZINY</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.minutes}</DivForTimerCharachter><Label>MINUTY</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.seconds}</DivForTimerCharachter><Label>SEKUNDY</Label></OneElementDiv>
            </CountdownTimerMainDiv>
            <Button onClick={handleButtonTheme}>
            Zmien theme
            </Button>
            <Footer>
                <FooterText>Wykonano z myślą o wakacjach przez nexonstudio.pl</FooterText>
            </Footer>
        </MainDiv>
    );

}
const Button = styled.button`
    width: 150px;
    height: 30px;
    border: 1px solid red;
`

const FooterText = styled.text`
    font-size: 14px;
    color: white;
    opacity: 0.5;

`
const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`

const DivForTimerCharachter = styled.div`
font-size: 36px;
`

const Label = styled.div`
  position: absolute;
  bottom: -25px; 
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
`;

const CountdownTimerMainDiv = styled.div`
    height: 250px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 250px 0px;
`

const OneElementDiv = styled.div`
  margin: 20px;
  width: 100px;
  height: 100px;
  color: white;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 3px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Ustawienie pozycji względem potomnych elementów */
`;

const MainHeaderTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
    width: 100%;
    font-size: 36px;
    font-weight: bold;
    text-shadow: 4px 3px 6px rgba(66, 68, 90, 1);
    color: #ffffff;

`

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${props => (props.theme === 'dark' ? '#333' : '#fc466b')};
  color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};
  font-family: "Lato", sans-serif;
  font-weight: 400;
`;