import React from 'react';

import { useAuth } from '../../context/AuthContext';

import styled from 'styled-components';
import PrimaryButton from '../reusable/PrimaryButton';

type FinishTypes = 'none' | 'finish' | 'fail';

interface Props {
  setFinish: (arg: FinishTypes) => void;
  startTime: number;
  finish: FinishTypes;
  time: number;
  setTime: (arg: number) => void;
}

const FocusFinish = ({
  startTime,
  setTime,
  setFinish,
  finish,
  time,
}: Props) => {
  const { setTotalXP } = useAuth();

  const handleClaim = () => {
    if (finish === 'finish') {
      setTotalXP((prev) => prev + startTime);
    } else {
      setTotalXP((prev) => prev - time);
    }
    setFinish('none');
    setTime(startTime);
  };

  return (
    <Container>
      <InnerContainer>
        {finish === 'finish' ? (
          <Text>You Earned {startTime} XP!</Text>
        ) : (
          <Text>You Lost {time} XP!</Text>
        )}
      </InnerContainer>
      <ButtonContainer>
        <PrimaryButton
          name={finish === 'finish' ? 'Claim' : 'Accept'}
          onClick={handleClaim}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.8rem;
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-family: ${({ theme }) => theme.main.boldFont};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: center;
`;

export default FocusFinish;
