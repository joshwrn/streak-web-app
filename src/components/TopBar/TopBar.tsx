import { IoIosMenu } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';

import styled from 'styled-components';

const TopBar = () => {
  return (
    <Container>
      <MenuButton as={IoIosMenu} size={40} />
      <MenuSection>
        <Avatar />
        <MenuText>Mia Chapman</MenuText>
      </MenuSection>
      <SettingsButton as={IoSettingsOutline} size={28} />
    </Container>
  );
};

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.main.primaryText};
`;

const MenuButton = styled(Button)`
  transform: scaleY(0.8);
`;

const SettingsButton = styled(Button)``;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.main.primaryText};
  background-image: url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
  background-size: cover;
  background-position: center;
`;

const MenuText = styled.p`
  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.7rem;
  font-weight: bold;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8rem;

  z-index: 1;
  top: 0;
  display: flex;

  padding: 0 3.5rem;
`;

export default TopBar;
