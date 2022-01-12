import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';

import Donut from '../food/DonutSprinkles';

import styled from 'styled-components';

const TaskStatsFood = () => {
  return (
    <ShapesContainer>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 5, 10], fov: 50 }}
          dpr={2}
          resize={{ scroll: false, offsetSize: true }}
        >
          <OrbitControls />
          <ambientLight intensity={0.3} />
          <pointLight position={[15, 10, 10]} intensity={0.5} />
          <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={2} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, defaults to 1
          >
            <Donut
              scale={[40, 40, 40]}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </Float>
          <ContactShadows
            opacity={0.6}
            position={[0, -5, 0]}
            width={40}
            height={40}
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
  width: 13rem;
  height: 7.4rem;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default TaskStatsFood;
