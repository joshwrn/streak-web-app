import { Suspense, useState, useEffect, lazy } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Debug, Physics, usePlane, useBox } from '@react-three/cannon';

//import Panda from './PetPandaTs';

import { ActionName } from './pandaTypes';

import styled from 'styled-components';

// function BoxTrigger({ args, onCollide, position }) {
//   const [ref] = useBox(() => ({ isTrigger: true, args, position, onCollide }));
//   return (
//     <mesh {...{ position, ref }}>
//       <boxBufferGeometry args={args} />
//       <meshStandardMaterial wireframe transparent opacity={0} />
//     </mesh>
//   );
// }

// function Plane(props) {
//   const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
//   return (
//     <mesh ref={ref} receiveShadow>
//       <planeGeometry args={[1000, 1000]} />
//       <shadowMaterial color="#ff0000" transparent opacity={1} />
//     </mesh>
//   );
// }

// @ts-ignore
const Panda = lazy(() => import('./PetPandaTs'));

const PetScene = () => {
  const [currentAction, setCurrentAction] = useState<ActionName>('Idle');

  useEffect(() => {
    if (currentAction === 'Eat') {
      setTimeout(() => {
        setCurrentAction('Idle');
      }, 5000);
    }
  }, [currentAction]);

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
            // currentAction={currentAction}
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
          <Physics gravity={[0, -50, 0]}>
            {/* <Plane position={[0, -35, 0]} /> */}
            {/* <DonutSprinkles position={[25, 50, 4]} />
            <BoxTrigger
              args={[70, 10, 40]}
              onCollide={() => {
                setCurrentAction('Eat');
              }}
              position={[0, -30, 0]}
            /> */}
          </Physics>
        </Canvas>
      </Suspense>
      <Gradient />
    </ShapesContainer>
  );
};

const Gradient = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.main.gradient};
  width: 125%;
  height: 50vh;
  top: 10rem;
  z-index: -1;
`;

const ShapesContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: ${({ theme }) => theme.main.gradient}; */
  width: 100%;
  height: 50vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default PetScene;
