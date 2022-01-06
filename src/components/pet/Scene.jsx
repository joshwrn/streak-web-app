import { Suspense, useEffect, useRef } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Sky,
  Float,
  Stars,
} from '@react-three/drei';
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';

import Axolotl from './model/AxolotlModel';
import Tree from './model/Tree';

import styled from 'styled-components';

function Effects() {
  const ref = useRef();
  useFrame((state) => {
    // Disable SSAO on regress
    ref.current.blendMode.setBlendFunction(
      state.performance.current < 1
        ? BlendFunction.SKIP
        : BlendFunction.MULTIPLY
    );
  }, []);
  return (
    <EffectComposer multisampling={8}>
      <SSAO
        ref={ref}
        intensity={15}
        radius={10}
        luminanceInfluence={0}
        bias={0.035}
      />
    </EffectComposer>
  );
}

const Trees = ({ ...props }) => {
  return (
    <group {...props}>
      <Tree
        castShadow
        rotation={[0, 0, 0]}
        position={[-70, -40, -60]}
        scale={[15, 15, 15]}
      />
      <Tree
        castShadow
        rotation={[0, 5, 0]}
        position={[-125, -40, -90]}
        scale={[20, 20, 20]}
      />
      <Tree
        castShadow
        rotation={[0, 5, 0]}
        position={[-105, -40, -40]}
        scale={[12, 12, 12]}
      />
    </group>
  );
};

const PetScene = () => {
  return (
    <ShapesContainer>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 7, 60] }}
          dpr={2}
          resize={{ scroll: false, offsetSize: true }}
        >
          <OrbitControls />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />

          <ambientLight intensity={0.15} />
          <pointLight
            distance={0}
            decay={1}
            color="#ffffff"
            position={[0, 0, 150]}
            intensity={1}
            castShadow
          />
          <Axolotl
            scale={[15, 15, 15]}
            position={[0, 7, -10]}
            rotation={[0, 4.7, 0]}
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
