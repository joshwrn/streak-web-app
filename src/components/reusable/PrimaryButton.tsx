import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  onClick: () => void;
}

const PrimaryButton = ({ name, onClick }: Props) => {
  return (
    <StyledButton onClick={onClick} whileTap={{ scale: 0.95 }}>
      {name}
    </StyledButton>
  );
};

const StyledButton = styled(motion.button)`
  background: ${({ theme }) => theme.main.button};
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.main.borderRadius};
  border: none;
  color: ${({ theme }) => theme.main.primaryText};
  width: 215px;
  height: 53px;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.main.boldFont};
  cursor: pointer;
`;

export default PrimaryButton;
