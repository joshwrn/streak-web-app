import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

import Panda from './model/Panda';

import styled from 'styled-components';

const PetScene = () => {
  return (
    <ShapesContainer>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, -10, 90], fov: 50 }}
          dpr={2}
          resize={{ scroll: false, offsetSize: true }}
        >
          <OrbitControls />
          <ambientLight intensity={0.7} />
          <ambientLight intensity={0.4} color={'#744eff'} />
          <Panda
            scale={[18, 18, 18]}
            position={[0, -35, -20]}
            rotation={[0, 0.37, 0]}
          />
          <ContactShadows
            opacity={0.6}
            position={[3, -35, 5]}
            width={100}
            height={150}
            frames={1}
            blur={5}
            far={100}
            resolution={256}
          />
        </Canvas>
      </Suspense>
    </ShapesContainer>
  );
};

const ShapesContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.main.gradient};
  width: 100%;
  height: 50vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default PetScene;
