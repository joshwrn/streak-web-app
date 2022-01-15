import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { Physics, usePlane, useBox } from '@react-three/cannon';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../3d-models/food/donutSprinkles.gltf');
  const [ref] = useBox(() => ({
    mass: 0.5,
    position: [0, 5, 0],
    rotation: [0, 0, 0],
    ...props,
  }));
  return (
    <group ref={ref} scale={50} dispose={null}>
      <mesh
        geometry={nodes.Mesh_donutSprinkles.geometry}
        material={materials.brownLight}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_1.geometry}
        material={materials.purpleLight}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_2.geometry}
        material={materials.orange}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_3.geometry}
        material={materials.yellow}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_4.geometry}
        material={materials.green}
      />
    </group>
  );
}

useGLTF.preload('../3d-models/food/donutSprinkles.gltf');
