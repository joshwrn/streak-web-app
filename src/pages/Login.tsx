import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../components/reusable/PrimaryButton';
import PrimaryInput from '../components/reusable/PrimaryInput';
import { login, reset } from '../slices/authSlice';

import { useAppDispatch, useAppSelector } from '../app/hooks';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    setDisabled(username === '' || password === '');
  }, [username, password]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <PrimaryInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          maxLength={15}
          minLength={3}
        />

        <PrimaryInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          maxLength={15}
          minLength={3}
        />
        <PrimaryButton buttonsize="large" disabled={disabled} type="submit">
          Login
        </PrimaryButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 30px;
  button:last-child {
    margin-top: 50px;
  }
`;

export default Login;
