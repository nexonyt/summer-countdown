import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomizedSwitches from "../components/CustomizedSwitches";

const calculateWeekdaysLeft = (startDate, endDate) => {
  let count = 0;
  let current = new Date(startDate);
  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
};


const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target - now;

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

export default function SummerCountdown() {
  const endDate = "2025-08-31T00:35:00";
  const targetDate = "2025-06-21T10:00:00"; // Data wakacji
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [weekdaysLeft, setWeekdaysLeft] = useState(
    calculateWeekdaysLeft(targetDate)
  );
  const [theme, setTheme] = useState("light");

  const handleButtonTheme = (e) => {
    console.log(e);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
      setWeekdaysLeft(calculateWeekdaysLeft(new Date(), new Date(targetDate)));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatDate = (dateObj) => {
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yyyy = dateObj.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  // Postęp roku szkolnego
  const schoolStart = new Date("2024-09-01T00:00:00");
  const schoolEnd = new Date(targetDate); // już jako Date, nie string
  const totalSchoolTime = schoolEnd - schoolStart;
  const passedTime = new Date() - schoolStart;
  const percentCompleteRaw = (passedTime / totalSchoolTime) * 100;
  const percentComplete = Math.min(
    100,
    Math.max(0, percentCompleteRaw.toFixed(5))
  );
  const remainingPercent = (100 - percentCompleteRaw).toFixed(5);

  return (
    <MainDiv theme={theme}>
      <MainHeaderTitle>Odliczanie do wakacji 2025</MainHeaderTitle>
      <CountdownTimerMainDiv>
        <OneElementDiv>
          <DivForTimerCharachter>{timeLeft.days}</DivForTimerCharachter>
          <Label>DNI</Label>
        </OneElementDiv>
        <OneElementDiv>
          <DivForTimerCharachter>{timeLeft.hours}</DivForTimerCharachter>
          <Label>GODZINY</Label>
        </OneElementDiv>
        <OneElementDiv>
          <DivForTimerCharachter>{timeLeft.minutes}</DivForTimerCharachter>
          <Label>MINUTY</Label>
        </OneElementDiv>
        <OneElementDiv>
          <DivForTimerCharachter>{timeLeft.seconds}</DivForTimerCharachter>
          <Label>SEKUNDY</Label>
        </OneElementDiv>
      </CountdownTimerMainDiv>

      <AdditionalInformationDiv>
        <AlternativeTextMini>
          Bez weekendów do wakacji zostało tylko:
        </AlternativeTextMini>
        <AlternativeText>{weekdaysLeft} dni</AlternativeText>
        <br></br>
        <AlternativeTextMini>Koniec roku szkolnego: </AlternativeTextMini>
        <AlternativeText>{formatDate(new Date(targetDate))}</AlternativeText>
        <br></br>
        <AlternativeTextMini>Koniec wakacji: </AlternativeTextMini>
        <AlternativeText>{formatDate(new Date(endDate))}</AlternativeText>
        <br></br>
          <br></br>
        <AlternativeText>
          Pozostało {remainingPercent}% roku szkolnego
        </AlternativeText>

          <br></br>
        <ProgressBarWrapper>
          <AlternativeTextMini>Postęp roku szkolnego: </AlternativeTextMini>
          <br></br>
          <ProgressBar>
            <Progress style={{ width: `${percentComplete}%` }} />
          </ProgressBar>
          <ProgressPercent>{percentComplete}% zakończone</ProgressPercent>
        </ProgressBarWrapper>
      </AdditionalInformationDiv>

      <DivForOnClick onClick={handleButtonTheme}>
        <CustomizedSwitches />
      </DivForOnClick>
      <Footer>
        <FooterText>
          Wykonano z myślą o wakacjach przez nexonstudio.pl
        </FooterText>
      </Footer>
    </MainDiv>
  );
}

const DivForOnClick = styled.div``;
const Button = styled.button`
  width: 150px;
  height: 30px;
`;

const CasualText = styled.text`
  font-size: 24px;
  color: white;
  margin: 25px 0px;
`;

const FooterText = styled.text`
  font-size: 14px;
  color: white;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #000;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivForTimerCharachter = styled.div`
  font-size: 36px;
  color: #000000;
`;

const Label = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: 14px;
  color: #000000;
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
`;

const OneElementDiv = styled.div`
  margin: 20px;
  width: 20vw;
  max-width: 100px;
  aspect-ratio: 1 / 1;  // <- ZACHOWUJE PROPORCJE
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
  position: relative;
`;


const MainHeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 4px 1px 10px rgb(252, 227, 0);
  color: rgb(0, 0, 0);
  text-align: center;
  word-wrap: break-word;
`;

const AdditionalInformationDiv = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const AlternativeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 26px;
  /* font-weight: bold; */
  text-shadow: 4px 1px px rgb(0, 0, 0); 
  color:rgb(14, 14, 14);
`;

const AlternativeTextMini = styled.div`
 font-size: 20px;
`

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => (props.theme === "dark" ? "#333" : "#E1F5C4")};
  background: linear-gradient(
    to right,
    ${(props) => (props.theme === "dark" ? "#181818" : "#F7A900")},
    ${(props) => (props.theme === "dark" ? "#313030" : "#FFE100")}
  );
  position: relative;
  overflow: hidden;
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
  font-family: "Lato", sans-serif;
  font-weight: 400;

  /* Efekt bardziej widocznego szumu */
  &::before {
    content: "";
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

const ProgressBarWrapper = styled.div`
  margin-top: 20px;
  width: 300px;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #ccc;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: #4caf50;
  height: 100%;
  transition: width 0.5s ease-in-out;
`;

const ProgressPercent = styled.div`
  margin-top: 5px;
  font-size: 18px;
  color: #000;
  text-align: center;
  opacity: 1;
`;
