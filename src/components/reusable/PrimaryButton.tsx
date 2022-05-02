import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  buttonsize?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({
  buttonsize = 'medium',
  children,
  onClick,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      buttonsize={buttonsize}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(motion.button)<Props>`
  background: ${({ theme, disabled }) =>
    disabled ? 'grey' : theme.main.button};
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.main.borderRadius};
  border: none;
  color: ${({ theme }) => theme.main.primaryText};
  width: ${({ buttonsize }) => (buttonsize === 'medium' ? '215px' : '100%')};
  height: 53px;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.main.boldFont};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s ease-in-out;
`;

export default PrimaryButton;
