import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Axolotl from './model/AxolotlModel';

import styled from 'styled-components';

const PetScene = () => {
  return (
    <ShapesContainer>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 60] }}
          dpr={2}
          resize={{ scroll: false, offsetSize: true }}
        >
          <OrbitControls />
          <ambientLight intensity={0.15} />
          <pointLight
            distance={0}
            decay={1}
            color="#ffffff"
            position={[0, 0, 150]}
            intensity={1}
          />
          <Axolotl
            scale={[15, 15, 15]}
            position={[0, 0, -10]}
            rotation={[0, 4.7, 0]}
          />
        </Canvas>
      </Suspense>
    </ShapesContainer>
  );
};

const ShapesContainer = styled.div`
  position: absolute;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default PetScene;
