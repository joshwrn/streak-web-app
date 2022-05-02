import { incrementByAmount, decrementByAmount } from '../../slices/xpSlice';
import { useAppDispatch } from '../../app/hooks';

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
  const dispatch = useAppDispatch();

  const handleClaim = () => {
    finish === 'finish'
      ? dispatch(incrementByAmount(startTime))
      : dispatch(decrementByAmount(time));
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
        <PrimaryButton onClick={handleClaim}>
          {finish === 'finish' ? 'Claim' : 'Accept'}
        </PrimaryButton>
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
  gap: 50px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.8rem;
  width: 100%;
`;

const Text = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-family: ${({ theme }) => theme.main.boldFont};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default FocusFinish;
