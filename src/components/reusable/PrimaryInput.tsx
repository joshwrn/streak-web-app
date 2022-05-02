import React from 'react';
import styled from 'styled-components';

interface Props {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

const PrimaryInput = ({ ...props }: Props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input<Props>`
  width: 100%;
  height: 5rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.8rem;
  padding-left: 2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.task.background};
  border: 0.1rem solid ${({ theme }) => theme.main.border};
  ::placeholder {
    color: #f4eeff68;
  }
`;

export default PrimaryInput;
