import cake from '../../assets/food/cake.png';
import CircularProgress from '../reusable/CircularProgress';

import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import styled from 'styled-components';

interface Props {
  time: number;
  progress: number;
  start: boolean;
  startTime: number;
  setStartTime: (arg: (prev: number) => number) => void;
}

const FocusDial = ({
  time,
  progress,
  start,
  startTime,
  setStartTime,
}: Props) => {
  const handleInterval = (direction: string) => {
    if (start === true) return;

    if (direction === 'down' && startTime > 10) {
      return setStartTime((prev) => prev - 10);
    }

    if (startTime < 120) {
      return setStartTime((prev) => prev + 10);
    }
  };

  return (
    <DialContainer>
      <InnerDialContainer>
        <CircularProgress radius={122} stroke={8} progress={progress} />
        <DialBorder />
        <ImageContainer>
          <img src={cake} alt="cake" />
          <TimerContainer>
            <TimerArrow
              as={RiArrowLeftSLine}
              size={30}
              onClick={() => {
                handleInterval('down');
              }}
            />
            <Time>{time === 0 ? startTime : time}</Time>
            <TimerArrow
              as={RiArrowRightSLine}
              size={30}
              onClick={() => {
                handleInterval('up');
              }}
            />
          </TimerContainer>
        </ImageContainer>
      </InnerDialContainer>
      <DialBackground />
      <DialBlur />
    </DialContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 215px;
  height: 215px;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Time = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-weight: bold;
`;

const TimerArrow = styled.div`
  color: ${({ theme }) => theme.main.lightText};
`;

const DialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 244px;
  margin-top: 1.5rem;
`;

const InnerDialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 244px;
  width: 244px;
`;

const DialBackground = styled.div`
  width: 204px;
  height: 204px;
  border-radius: 50%;
  background: ${({ theme }) => theme.focus.dialBackground};
`;

const DialBorder = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: ${({ theme }) => theme.focus.dialBorder};
  position: absolute;
  z-index: -1;
`;

const DialBlur = styled.div`
  width: 212px;
  height: 212px;
  background-color: ${({ theme }) => theme.focus.dial};
  position: absolute;
  border-radius: 50%;
  z-index: -2;
  filter: blur(45px);
  opacity: 0.48;
`;

export default FocusDial;
