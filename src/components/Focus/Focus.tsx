import { useState, useEffect } from 'react';

import FocusDial from './FocusDial';
import FocusFinish from './FocusFinish';
import PrimaryButton from '../reusable/PrimaryButton';

import styled from 'styled-components';
import { motion } from 'framer-motion';

type FinishTypes = 'none' | 'finish' | 'fail';

const Focus = () => {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState<FinishTypes>('none');
  const [progress, setProgress] = useState(50);
  const [startTime, setStartTime] = useState(10);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    const percent = (time / startTime) * 100;
    setProgress(percent);
    if (time === 0 && start === true) {
      setTimeout(() => {
        setStart(false);
        setFinish('finish');
      }, 1000);
    }
  }, [time]);

  useEffect(() => {
    const second = (time: number) => {
      return time * 1000;
    };

    if (start) {
      const interval = setTimeout(() => {
        setTime(time - 1);
      }, second(1));

      if (time <= 0) {
        clearTimeout(interval);
        setStart(false);
      }

      return () => clearTimeout(interval);
    }
  });

  const handleStart = () => {
    if (start) {
      setFinish('fail');
      setStart(false);
    } else {
      setStart(true);
    }
  };

  return (
    <Container
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: '100vh' }}
      exit={{ opacity: 0, x: '-100vh', position: 'absolute' }}
      transition={{
        opacity: { type: 'spring', damping: 15 },
        x: { type: 'spring', damping: 15 },
        delay: 0.1,
      }}
    >
      {finish !== 'none' && (
        <FocusFinish
          startTime={startTime}
          setTime={setTime}
          setFinish={setFinish}
          finish={finish}
          time={time}
        />
      )}
      {finish === 'none' && (
        <>
          <FocusDial
            time={time}
            progress={progress}
            start={start}
            startTime={startTime}
            setStartTime={setStartTime}
          />
          <ButtonContainer>
            <PrimaryButton
              name={start ? 'Stop' : 'Start'}
              onClick={handleStart}
            />
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 30px;
  max-height: ${({ theme }) => theme.main.maxHeight / 2}rem;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

export default Focus;
