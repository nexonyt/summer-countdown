import React from "react";
import { useState,useEffect } from "react";
import styled from 'styled-components'
import CustomizedSwitches from "../components/CustomizedSwitches";
import ProgressBar from "../components/ProgressBarDiv";
import { LinearProgressBar } from "react-percentage-bar";







const calculateSchoolYearProgress = (targetDate) => {
  const startOfSchoolYear = new Date("2024-09-01"); // Data początku roku szkolnego
  const startOfSummer = new Date("2025-06-27"); // Data początku wakacji
  const now = new Date();

  if (now < startOfSchoolYear) {
      return 100; // Przed rozpoczęciem roku szkolnego cały rok jeszcze został
  } else if (now >= startOfSummer) {
      return 0; // Po rozpoczęciu wakacji nic już nie zostało
  }

  const totalSchoolYear = startOfSummer - startOfSchoolYear; // Całkowity czas trwania roku szkolnego w milisekundach
  const elapsedTime = now - startOfSchoolYear; // Czas, który upłynął od początku roku szkolnego

  const remainingTime = totalSchoolYear - elapsedTime;
  const remainingPercentage = (remainingTime / totalSchoolYear) * 100;

  return remainingPercentage.toFixed(5); // Zwrócenie wartości zaokrąglonej do dwóch miejsc po przecinku
};


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

  const calculateWeekdaysLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    let weekdays = 0;

    while (now < target) {
        const day = now.getDay();
        if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
            weekdays++;
        }
        now.setDate(now.getDate() + 1);
    }

    return weekdays;
};
  

export default function SummerCountdown() {
    const targetDate = "2025-06-27"; // Data wakacji
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    const [weekdaysLeft, setWeekdaysLeft] = useState(calculateWeekdaysLeft(targetDate));
    const [percentageValue,setPercentageValue] = useState(calculateSchoolYearProgress(targetDate));
    const [theme,setTheme] = useState('dark')
  
    const handleButtonTheme = (e) => {
        console.log(e)
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };


  

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
  
      return () => clearInterval(timer); 
    }, [targetDate]);

    return (
        <MainDiv theme={theme}>

            <MainHeaderTitle>Odliczanie do wakacji 2025</MainHeaderTitle>
            <CountdownTimerMainDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.days}</DivForTimerCharachter><Label>DNI</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.hours}</DivForTimerCharachter><Label>GODZIN</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.minutes}</DivForTimerCharachter><Label>MINUT</Label></OneElementDiv>
                <OneElementDiv><DivForTimerCharachter>{timeLeft.seconds}</DivForTimerCharachter><Label>SEKUND</Label></OneElementDiv>
            </CountdownTimerMainDiv>
            <CasualText theme={theme}>Bez weekendów do wakacji pozostało: {weekdaysLeft} dni</CasualText>
            <CasualText theme={theme}>Ile procent roku szkolnego upłyneło?</CasualText>
            <ProgressBar percentage={percentageValue} />   

                <DivForOnClick onClick={handleButtonTheme}>
                <CustomizedSwitches ></CustomizedSwitches>
                </DivForOnClick>
                <CasualText>Koniec roku szkolnego: {targetDate}</CasualText>
            <Footer>
                <FooterText>Wykonano z myślą o wakacjach przez nexonstudio.pl</FooterText>
            </Footer>
        </MainDiv>
    );

}



const DivForOnClick = styled.div``

const CasualText = styled.text`
 font-size: 24px;
 color: ${props => (props.theme === 'light' ? 'black' : 'white')};
 margin: 25px 0px;
 text-align: center;
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
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 0px 0px;
`

const OneElementDiv = styled.div`
  margin: 20px;
  width: 70px;
  height: 40px;
  color: white;
  //background: rgba(255, 255, 255, 0.11);
 /* border-radius: 3px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(255, 255, 255, 0.3); */
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
  background: ${props => (props.theme === 'dark' ? '#333' : '#c2bdcf')};
  background: linear-gradient(
    to right, 
    ${props => (props.theme === 'dark' ? '#181818' : '#c2bdcf')}, 
    ${props => (props.theme === 'dark' ? '#313030' : '#bdb9c2')}
  );
  position: relative;
  overflow: hidden;
  color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};
  font-family: "Lato", sans-serif;
  font-weight: 400;

  /* Efekt bardziej widocznego szumu */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="5" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" /></svg>');
    opacity: 0.4; /* Bardziej widoczny szum */
    z-index: 1;
    pointer-events: none; /* Blokuje interakcję */
    mix-blend-mode: overlay; /* Opcjonalnie, dla lepszego kontrastu */
  }

  /* Elementy w środku */
  z-index: 2;
`;
