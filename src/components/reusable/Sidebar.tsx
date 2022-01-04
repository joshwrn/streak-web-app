import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarContainer>
      <StyledSidebar
        key="TaskContainer"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -500 }}
      >
        {children}
      </StyledSidebar>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 450px;
  height: 100vh;
`;

const StyledSidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.main.background};
  border: 1px solid ${({ theme }) => theme.main.border};
  border-radius: 0.5rem;

  width: 400px;
  height: 95vh;
  padding: 2rem;
  gap: 2rem;
`;

export default Sidebar;
